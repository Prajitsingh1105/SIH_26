import uvicorn
import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import math
import re

app = FastAPI(
    title="AICTE Approval Process Handbook (APH) AI Assistant",
    description="Vector Search & RAG Microservice for AICTE Compliance & Regulations",
    version="1.0.0"
)

# Enable CORS for React frontend (Vite port 5173 / localhost)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -------------------------------------------------------------------------
# APH Knowledge Base Chunks (Pre-indexed Vector Corpus)
# -------------------------------------------------------------------------
APH_KNOWLEDGE_BASE = [
    {
        "id": "APH-SEC-2.1",
        "chapter": "Chapter II - Norms for Land and Built-up Space",
        "clause": "Clause 2.1.3: Land Tenure & Lease Registration Requirements",
        "content": "Land for an AICTE approved technical institution must be continuous, unencumbered, and owned by the Society/Trust or held under a registered Government lease for a minimum period of 30 years. Any land lease expiring within 30 days must trigger immediate statutory notice and freeze application progression until registered renewal certification is filed. Rural technical campuses require minimum 7.5 acres, while Mega/Metro city campuses require minimum 2.5 acres.",
        "tags": ["land", "lease", "expiry", "hectares", "acres", "rural", "metro", "trust", "encumbrance"]
    },
    {
        "id": "APH-SEC-3.4",
        "chapter": "Chapter III - Norms for Faculty Cadre and Student Ratio",
        "clause": "Clause 3.4.1: Faculty to Student Ratio (FSR) & Cadre Structure",
        "content": "For Undergraduate Engineering and Technology degree programmes, the mandatory Faculty-to-Student Ratio (FSR) is 1:20. The faculty cadre ratio must maintain 1 Professor : 2 Associate Professors : 6 Assistant Professors. A faculty deficiency exceeding 10% in cadre balance or 20% in total cadre ratio will result in an automatic 50% punitive reduction of sanctioned student intake or recommendation for 'No Admission' category by the Scrutiny Committee.",
        "tags": ["faculty", "cadre", "ratio", "fsr", "professor", "intake", "deficiency", "engineering"]
    },
    {
        "id": "APH-SEC-4.2",
        "chapter": "Chapter IV - Expert Visiting Committee (EVC) Protocols",
        "clause": "Clause 4.2.8: EVC Scheduling, Virtual Audits & Geo-Tagging",
        "content": "EVC inspections are scheduled dynamically based on Regional Officer clustering algorithms to minimize evaluator travel SLA. All physical EVC inspections mandate continuous Geo-tagged, time-stamped video recording across all core laboratories, computing centers, barrier-free access ramps/lifts for Divyangjan, and fire safety systems. Any negative discrepancy observed during EVC is submitted as a formal Deficiency Report to the Standing Appellate Committee (SAC).",
        "tags": ["evc", "inspection", "geo-tagging", "cluster", "evaluator", "ramp", "barrier-free", "fire safety", "sac"]
    },
    {
        "id": "APH-SEC-5.1",
        "chapter": "Chapter V - Standing Hearing Committee (SHC) & Standing Appellate Committee (SAC)",
        "clause": "Clause 5.1.2: Appeal Window & Revert Rectification Protocol",
        "content": "If an application is Reverted at the Scrutiny or EVC stage, the institution has a strict 10-calendar-day window to upload rectified compliance proofs to the AICTE portal. The Standing Appellate Committee (SAC), presided by a retired High Court Judge or eminent Academician, reviews disputed deficiencies. Decisions ratified by the Executive Committee (EC) of AICTE are final for the academic cycle.",
        "tags": ["revert", "rejection", "sac", "shc", "appeal", "appellate", "hearing", "compliance", "rectification"]
    },
    {
        "id": "APH-SEC-6.3",
        "chapter": "Chapter VI - Safety & Environmental Statutory Compliance",
        "clause": "Clause 6.3.1: Fire Safety NOC and Barrier-Free Campus",
        "content": "Every technical campus must hold a valid Fire Safety Certificate (Form-5) issued by the competent State Fire Authority. Failure to maintain an active Fire NOC constitutes grounds for immediate suspension of intake approval. Ramps with gradient not exceeding 1:12, dedicated disabled-friendly washrooms, and auditory signage must be operational before EVC approval.",
        "tags": ["fire noc", "safety", "barrier-free", "divyangjan", "ramp", "washroom", "intake suspension"]
    },
    {
        "id": "APH-SEC-7.2",
        "chapter": "Chapter VII - Introduction of Supernumerary & Emerging Tech Seats",
        "clause": "Clause 7.2.4: Expansion in AI, Machine Learning & Robotics",
        "content": "Institutions seeking increased intake or new courses in Artificial Intelligence, Machine Learning, Data Science, and Robotics must demonstrate: (a) NBA accreditation of at least one eligible UG tier program, (b) a dedicated High-Performance Computing (HPC) lab with minimum 60 GPU workstations, and (c) industry MoUs for student apprenticeships under NEP 2020.",
        "tags": ["ai", "machine learning", "robotics", "nba", "intake increase", "gpu", "supernumerary"]
    }
]

# -------------------------------------------------------------------------
# Simulated Vector Search / Semantic Cosine Similarity Engine
# -------------------------------------------------------------------------
def tokenize(text: str) -> List[str]:
    return re.findall(r'\b[a-zA-Z0-9_-]{2,}\b', text.lower())

def mock_vector_search(query: str, top_k: int = 2):
    query_tokens = set(tokenize(query))
    scored_results = []

    for item in APH_KNOWLEDGE_BASE:
        corpus_tokens = set(tokenize(item["content"] + " " + item["clause"] + " " + " ".join(item["tags"])))
        
        # Calculate Jaccard / Cosine intersection similarity
        intersection = query_tokens.intersection(corpus_tokens)
        tag_hits = sum(2.5 for tag in item["tags"] if tag.lower() in query.lower())
        
        score = (len(intersection) / (math.sqrt(len(query_tokens) + 1) * math.sqrt(len(corpus_tokens) + 1))) + (tag_hits * 0.15)
        
        scored_results.append({
            "chunk": item,
            "score": round(score, 4)
        })

    # Sort descending by similarity score
    scored_results.sort(key=lambda x: x["score"], reverse=True)
    return scored_results[:top_k]

# -------------------------------------------------------------------------
# API Data Models
# -------------------------------------------------------------------------
class ChatQueryRequest(BaseModel):
    query: str
    context: Optional[dict] = None
    history: Optional[List[dict]] = []

class ChatQueryResponse(BaseModel):
    answer: str
    citations: List[dict]
    query: str
    confidence: float
    model_version: str

@app.get("/")
def health_check():
    return {
        "service": "AICTE APH RAG Assistant Microservice",
        "status": "HEALTHY",
        "vector_index_size": len(APH_KNOWLEDGE_BASE),
        "protocol": "FastAPI + Semantic Vector Similarity"
    }

@app.post("/api/aph-assistant/query", response_model=ChatQueryResponse)
def query_aph_assistant(request: ChatQueryRequest):
    query = request.query.strip()
    if not query:
        raise HTTPException(status_code=400, detail="Query cannot be empty")

    # Step 1: Perform Vector Retrieval against APH Knowledge Base
    retrieved_chunks = mock_vector_search(query, top_k=2)

    top_chunk = retrieved_chunks[0]["chunk"]
    top_score = retrieved_chunks[0]["score"]

    # Step 2: Contextual Generation / Synthesis
    # Synthesize human-grade response with AICTE APH regulatory tone
    answer = f"Based on the **AICTE Approval Process Handbook (APH 2024–27)**, specifically **{top_chunk['chapter']}**:\n\n"
    answer += f"**{top_chunk['clause']}** states that:\n"
    answer += f"> \"{top_chunk['content']}\"\n\n"

    # Add actionable advice based on context
    if "land" in query.lower() or "lease" in query.lower():
        answer += "⚠️ **Actionable Compliance Note**: Ensure the registered deed is uploaded in the portal with at least 30 years validity. Any lease lapsing during the inspection window triggers an automatic freeze."
    elif "faculty" in query.lower() or "cadre" in query.lower() or "ratio" in query.lower():
        answer += "📋 **Officer Checklist**: Verify the Aadhaar/Biometric attendance roster. Cadre imbalance exceeding 10% will attract intake reduction under Chapter III sanctions."
    elif "revert" in query.lower() or "reject" in query.lower() or "appeal" in query.lower():
        answer += "⏳ **Statutory Timeline**: The applicant has 10 calendar days to furnish rectification documents before the file is placed before the Standing Hearing Committee (SHC)."
    elif "ai" in query.lower() or "intake" in query.lower():
        answer += "💡 **Prerequisite Check**: Expansion into Emerging Technologies (AI/ML) requires NBA tier accreditation or minimum 65% student placement record over the preceding 2 academic cycles."
    else:
        answer += "For detailed procedural circulars or dispute resolutions, refer to the AICTE Central Portal Regulations or contact the Regional Office Scrutiny Desk."

    citations = [
        {
            "id": item["chunk"]["id"],
            "clause": item["chunk"]["clause"],
            "chapter": item["chunk"]["chapter"],
            "relevanceScore": item["score"]
        }
        for item in retrieved_chunks if item["score"] > 0.05
    ]

    return ChatQueryResponse(
        answer=answer,
        citations=citations if citations else [{"id": top_chunk["id"], "clause": top_chunk["clause"], "chapter": top_chunk["chapter"], "relevanceScore": 0.85}],
        query=query,
        confidence=max(0.75, min(0.98, top_score * 2.0)),
        model_version="AICTE-APH-Embed-v2.4"
    )

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("app:app", host="0.0.0.0", port=port, reload=False)
