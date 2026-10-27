
import streamlit as st
from rag_engine import RAGEngine

st.set_page_config(
    page_title="EverQuint RAG Search",
    page_icon="🔎",
    layout="wide",
)

st.title("Document Search and Summarization")
st.caption("Document retrieval using TF-IDF and extractive summarization")


@st.cache_resource
def get_engine():
    engine = RAGEngine()
    engine.load_documents()
    engine.build_index()
    return engine


try:
    engine = get_engine()
except Exception as exc:
    st.error(f"Unable to initialize the search engine: {exc}")
    st.info("Check that the data folder contains .txt files.")
    st.stop()


st.sidebar.header("Search Settings")

top_k = st.sidebar.slider(
    "Number of passages to retrieve",
    min_value=1,
    max_value=min(10, len(engine.chunks)),
    value=min(3, len(engine.chunks)),
)

summary_length = st.sidebar.select_slider(
    "Summary length",
    options=["Short", "Medium", "Long"],
    value="Medium",
)

# Define the query before using it.
query = st.text_input(
    "Ask a question about your documents",
    placeholder="Example: How does retrieval-augmented generation work?",
)

search_button = st.button("Search and Summarize", type="primary")

if search_button:
    if not query.strip():
        st.warning("Please enter a search query.")
    else:
        try:
            results = engine.search(query, top_k=top_k)

            st.subheader("Summary")
            summary = engine.summarize(
                [results[0]["text"]],
                 summary_length=summary_length,
            )
            st.write(summary)

            st.subheader("Retrieved Passages")

            for item in results:
                with st.expander(
                    f"{item['rank']}. {item['document_id']} "
                    f"— score {item['score']:.3f}"
                ):
                    st.write(item["text"])
                    st.caption(
                        f"TF-IDF score: {item['lexical_score']:.3f} | "
                        f"Chunk: {item['chunk_id']}"
                    )
        except Exception as exc:
            st.error(f"Search failed: {exc}")

st.sidebar.markdown("---")
st.sidebar.write(f"Documents loaded: {len(engine.documents)}")
st.sidebar.write(f"Searchable passages: {len(engine.chunks)}")
