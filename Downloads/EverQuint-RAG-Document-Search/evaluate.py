
from rag_engine import RAGEngine


def recall_at_k(results, relevant_document, k):
    top_results = results[:k]
    return float(
        any(item["document_id"] == relevant_document for item in top_results)
    )


def reciprocal_rank(results, relevant_document):
    for rank, item in enumerate(results, start=1):
        if item["document_id"] == relevant_document:
            return 1.0 / rank
    return 0.0


def run_evaluation():
    engine = RAGEngine()
    engine.load_documents()
    engine.build_index()

    # Queries with manually assigned relevant documents.
    test_cases = [
        ("What is artificial intelligence and deep learning?", "ai.txt"),
        ("How does retrieval augmented generation use documents?", "rag.txt"),
        ("How do solar panels and wind turbines produce energy?",
         "renewable_energy.txt"),
    ]

    recall_values = []
    reciprocal_ranks = []

    for query, relevant_document in test_cases:
        results = engine.search(query, top_k=3)

        recall = recall_at_k(results, relevant_document, 3)
        rr = reciprocal_rank(results, relevant_document)

        recall_values.append(recall)
        reciprocal_ranks.append(rr)

        print(f"\nQuery: {query}")
        print(f"Expected relevant document: {relevant_document}")
        print("Retrieved:", [item["document_id"] for item in results])
        print(f"Recall@3: {recall:.2f}")
        print(f"Reciprocal rank: {rr:.2f}")

    print("\n--- Aggregate Retrieval Metrics ---")
    print(f"Recall@3: {sum(recall_values) / len(recall_values):.3f}")
    print(f"MRR: {sum(reciprocal_ranks) / len(reciprocal_ranks):.3f}")

    # Example summary evaluation. The reference is manually written.
    from rouge_score import rouge_scorer

    reference = (
        "Retrieval augmented generation retrieves relevant document passages "
        "and supplies them to a language model to produce grounded answers."
    )
    generated = engine.summarize(
        [
            "Retrieval-Augmented Generation combines document retrieval "
            "with language generation. A retrieval system searches a "
            "document collection and selects relevant passages."
        ],
        summary_length="Short",
    )

    scorer = rouge_scorer.RougeScorer(
        ["rouge1", "rougeL"],
        use_stemmer=True,
    )
    scores = scorer.score(reference, generated)

    print("\n--- Example Summary Evaluation ---")
    print("Reference:", reference)
    print("Generated:", generated)

    for metric, score in scores.items():
        print(f"{metric}: F1={score.fmeasure:.3f}")


if __name__ == "__main__":
    run_evaluation()
