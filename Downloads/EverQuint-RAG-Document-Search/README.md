# EverQuint — RAG Document Search and Summarization

A Python-based document search and summarization application that retrieves relevant passages from a text corpus and generates concise summaries using extractive summarization techniques.

The application provides a Streamlit interface for searching documents, adjusting retrieval settings, viewing ranked passages, and evaluating retrieval and summary quality.

## Project Overview

Retrieval-Augmented Generation (RAG) is an approach that combines information retrieval with language generation. A typical RAG pipeline retrieves relevant document passages and provides them as context to a language model to help produce grounded answers.

This project implements a lightweight document retrieval and summarization baseline using TF-IDF and extractive summarization. It is designed to demonstrate document ingestion, text chunking, search ranking, summarization, evaluation, and an interactive interface.

**Current implementation:** TF-IDF retrieval and extractive summarization. Dense embedding retrieval and LLM-generated summaries are not yet implemented.

## Features

- **Document ingestion:** Loads text documents from a local corpus.
- **Text preprocessing:** Splits documents into smaller, overlapping passages.
- **Information retrieval:** Uses TF-IDF with unigrams and bigrams to calculate query-to-passage similarity.
- **Ranked search results:** Displays relevant passages with similarity scores.
- **Extractive summarization:** Selects important sentences from retrieved content.
- **Adjustable summary length:** Supports Short, Medium, and Long summary settings.
- **Interactive interface:** Provides a Streamlit web application.
- **Retrieval evaluation:** Calculates Recall@3 and Mean Reciprocal Rank (MRR).
- **Summary evaluation:** Uses ROUGE-1 and ROUGE-L F1 scores.
- **Local execution:** Runs without a paid API key or external LLM service.

## Technology Stack

| Component | Technology |
|---|---|
| Programming language | Python |
| User interface | Streamlit |
| Text retrieval | Scikit-learn TF-IDF |
| Similarity calculation | Cosine similarity |
| Numerical operations | NumPy |
| Summarization | Extractive sentence selection |
| Evaluation | Recall@k, MRR, ROUGE |
| Development environment | Visual Studio Code |

## Project Structure

```text
EverQuint-RAG-Document-Search/
│
├── app.py                  # Streamlit user interface
├── rag_engine.py           # Document ingestion, retrieval, summarization
├── evaluate.py             # Retrieval and summary evaluation
├── requirements.txt        # Python dependencies
├── README.md               # Project documentation
│
└── data/
    ├── ai.txt               # Artificial intelligence document
    ├── rag.txt              # RAG concepts and techniques
    └── renewable_energy.txt # Renewable energy document
```

A local `.venv/` directory may also exist. It should not be committed to GitHub.

## System Architecture

The application follows this workflow:

1. **Document ingestion:** Read `.txt` files from the `data/` directory.
2. **Text chunking:** Divide documents into smaller passages with overlapping words.
3. **Index creation:** Convert passages into TF-IDF feature vectors.
4. **Query processing:** Accept a user's search query through Streamlit.
5. **Similarity calculation:** Calculate cosine similarity between the query and indexed passages.
6. **Ranking:** Return the top-k passages in descending similarity order.
7. **Summarization:** Extract important sentences from the selected passage or passages.
8. **Evaluation:** Compare retrieval results against manually assigned relevant documents and compare a sample summary against a reference summary.

## Installation and Setup

### Prerequisites

- Python 3.9 or later
- pip package manager
- Visual Studio Code or another Python editor

### 1. Clone the Repository

```bash
git clone https://github.com/sowmiyavani28/EverQuint-RAG-Document-Search.git
cd EverQuint-RAG-Document-Search
```

### 2. Create a Virtual Environment

On Windows:

```bash
python -m venv .venv
```

Activate the environment:

```bash
.venv\Scripts\activate
```

### 3. Install Dependencies

```bash
python -m pip install --no-cache-dir -r requirements.txt
```

The dependencies used by the current application are:

```text
streamlit
scikit-learn
numpy
rouge-score
```

Ensure `requirements.txt` contains the packages actually required by the final versions of `app.py`, `rag_engine.py`, and `evaluate.py`.

## Running the Application

Start the Streamlit application:

```bash
streamlit run app.py
```

Streamlit will display a local URL, usually:

```text
http://localhost:8501
```

Open the URL in a browser.

### How to Use

1. Enter a question about the available documents.
2. Choose the number of passages to retrieve.
3. Select a summary length: Short, Medium, or Long.
4. Click **Search and Summarize**.
5. Read the generated extractive summary.
6. Expand the retrieved passages to inspect their content and similarity scores.

### Example Queries

**Query 1: Artificial Intelligence**

```text
What is artificial intelligence and deep learning?
```

Expected relevant document: `ai.txt`

**Query 2: Retrieval-Augmented Generation**

```text
How does retrieval augmented generation use documents?
```

Expected relevant document: `rag.txt`

**Query 3: Renewable Energy**

```text
How do solar panels and wind turbines produce energy?
```

Expected relevant document: `renewable_energy.txt`

The expected documents are based on the current sample corpus.

## Evaluation

Run the evaluation script:

```bash
python evaluate.py
```

The script evaluates retrieval performance on three manually labelled queries and evaluates one example summary against a manually written reference.

### Retrieval Metrics

| Metric | Observed Result |
|---|---:|
| Recall@3 | 1.000 |
| Mean Reciprocal Rank (MRR) | 1.000 |

**Interpretation:** For the three evaluated queries, the expected relevant document appeared within the top three retrieved results and was ranked first for each query.

### Summary Metrics

| Metric | Observed Result |
|---|---:|
| ROUGE-1 F1 | 0.526 |
| ROUGE-L F1 | 0.316 |

ROUGE scores measure overlap between the generated summary and a reference summary. They do not independently establish factual accuracy, completeness, or semantic correctness.

The results above are from the current small evaluation run. They should not be interpreted as evidence of performance on a large or diverse document collection.

## Current Limitations

- The current retrieval implementation uses TF-IDF rather than dense embeddings.
- Summarization is extractive rather than LLM-generated.
- The application uses a small sample corpus containing three text documents.
- Retrieval evaluation uses only three manually labelled queries.
- Summary evaluation uses one manually written reference summary.
- The application does not currently implement a vector database, reranking model, or generative answer verification.
- Performance on large document collections has not been established.

## Future Improvements

1. Integrate dense embeddings for semantic retrieval.
2. Combine lexical and dense retrieval into a hybrid search pipeline.
3. Add a vector store such as FAISS or Chroma for larger collections.
4. Integrate an LLM provider for abstractive summarization.
5. Include citations linking generated summaries to their source passages.
6. Expand the evaluation dataset and add more representative queries.
7. Evaluate retrieval with Precision@k, Recall@k, MRR, and nDCG.
8. Evaluate summary quality with ROUGE and additional factuality or semantic metrics.
9. Add support for PDF and DOCX document ingestion.
10. Improve the interface with document uploads, filtering, and download options.

## Conclusion

This project demonstrates a lightweight document retrieval and extractive summarization workflow using Python, TF-IDF, cosine similarity, and Streamlit. It provides an interactive search interface and a basic evaluation pipeline for measuring retrieval and summary quality.

The implementation is a baseline for further development toward a full RAG system with semantic embeddings and LLM-generated summaries.
