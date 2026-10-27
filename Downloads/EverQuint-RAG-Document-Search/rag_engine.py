
from pathlib import Path
import re

import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

DATA_DIR = Path(__file__).parent / "data"


class RAGEngine:
    """Lightweight TF-IDF document search and extractive summarization."""

    def __init__(self, data_dir=DATA_DIR):
        self.data_dir = Path(data_dir)
        self.documents = []
        self.chunks = []
        self.vectorizer = TfidfVectorizer(
            stop_words="english",
            ngram_range=(1, 2),
        )
        self.matrix = None

    def load_documents(self):
        self.documents = []

        for path in sorted(self.data_dir.glob("*.txt")):
            content = path.read_text(encoding="utf-8").strip()
            if content:
                self.documents.append({
                    "document_id": path.name,
                    "text": content,
                })

        if not self.documents:
            raise ValueError(
                f"No non-empty .txt files found in {self.data_dir}"
            )

        return len(self.documents)

    @staticmethod
    def split_into_chunks(text, chunk_size=120, overlap=25):
        words = text.split()
        chunks = []
        start = 0

        while start < len(words):
            end = min(start + chunk_size, len(words))
            chunks.append(" ".join(words[start:end]))

            if end == len(words):
                break

            start = end - overlap

        return chunks

    def build_index(self):
        if not self.documents:
            self.load_documents()

        self.chunks = []

        for document in self.documents:
            for index, chunk in enumerate(
                self.split_into_chunks(document["text"])
            ):
                self.chunks.append({
                    "document_id": document["document_id"],
                    "chunk_id": index,
                    "text": chunk,
                })

        if not self.chunks:
            raise ValueError("No searchable passages were found.")

        self.matrix = self.vectorizer.fit_transform(
            [chunk["text"] for chunk in self.chunks]
        )

        return len(self.chunks)

    def search(self, query, top_k=5, lexical_weight=1.0):
        if not query.strip():
            raise ValueError("Please enter a search query.")

        if self.matrix is None:
            self.build_index()

        top_k = max(1, min(int(top_k), len(self.chunks)))
        query_vector = self.vectorizer.transform([query])

        scores = cosine_similarity(query_vector, self.matrix)[0]
        ranked = np.argsort(scores)[::-1][:top_k]

        return [
            {
                **self.chunks[index],
                "rank": rank,
                "lexical_score": float(scores[index]),
                "embedding_score": 0.0,
                "score": float(scores[index]),
            }
            for rank, index in enumerate(ranked, start=1)
        ]

    @staticmethod
    def summarize(texts, summary_length="Medium"):
        text = " ".join(texts)
        sentences = [
            sentence.strip()
            for sentence in re.split(r"(?<=[.!?])\s+", text.strip())
            if sentence.strip()
        ]

        if not sentences:
            return "No content available to summarize."

        limits = {"Short": 50, "Medium": 100, "Long": 180}
        limit = limits.get(summary_length, 100)

        if len(sentences) <= 1:
            return " ".join(sentences)

        vectorizer = TfidfVectorizer(stop_words="english")

        try:
            matrix = vectorizer.fit_transform(sentences)
            importance = np.asarray(matrix.sum(axis=1)).ravel()
        except ValueError:
            importance = np.ones(len(sentences))

        ranked = sorted(
            range(len(sentences)),
            key=lambda index: importance[index],
            reverse=True,
        )

        selected = []
        count = 0

        for index in ranked:
            sentence = sentences[index]
            words = len(sentence.split())

            if selected and count + words > limit:
                continue

            selected.append((index, sentence))
            count += words

            if count >= limit:
                break

        selected.sort(key=lambda item: item[0])
        return " ".join(sentence for _, sentence in selected)
