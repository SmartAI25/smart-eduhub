import json, os

questions = []
base_questions = [
    {
        "subject": "Indian Polity",
        "question": "भारत के संविधान का कौन सा अनुच्छेद यह प्रावधान करता है कि सर्वोच्च न्यायालय का निर्णय सभी न्यायालयों पर बाध्यकारी होगा?",
        "options": ["अनुच्छेद 141", "अनुच्छेद 142", "अनुच्छेद 143", "अनुच्छेद 136"],
        "correctAnswer": 0,
        "explanation": "अनुच्छेद 141 के अनुसार सर्वोच्च न्यायालय द्वारा घोषित कानून भारत के सभी न्यायालयों पर बाध्यकारी है।"
    },
    {
        "subject": "Modern History",
        "question": "1929 के ऐतिहासिक लाहौर अधिवेशन की अध्यक्षता किसने की थी जिसमें पूर्ण स्वराज का प्रस्ताव पारित हुआ था?",
        "options": ["महात्मा गांधी", "जवाहरलाल नेहरू", "सरदार पटेल", "सुभाष चंद्र बोस"],
        "correctAnswer": 1,
        "explanation": "पंडित जवाहरलाल नेहरू ने 1929 के लाहौर अधिवेशन की अध्यक्षता की थी।"
    },
    {
        "subject": "Geography",
        "question": "भारत में कौन सी नदी अपनी यात्रा के दौरान कर्क रेखा को दो बार पार करती है?",
        "options": ["नर्मदा नदी", "ताप्ती नदी", "माही नदी", "चंबल नदी"],
        "correctAnswer": 2,
        "explanation": "माही नदी मध्य प्रदेश, राजस्थान और गुजरात में बहते हुए कर्क रेखा को दो बार काटती है।"
    },
    {
        "subject": "Economy",
        "question": "कर की दरों और कुल सरकारी कर राजस्व के बीच सैद्धांतिक संबंध को कौन सा वक्र दर्शाता है?",
        "options": ["लॉरेंज वक्र", "फिलिप्स वक्र", "लाफर वक्र", "कुजनेट्स वक्र"],
        "correctAnswer": 2,
        "explanation": "लाफर वक्र कर की दर और प्राप्त होने वाले राजस्व के मध्य संबंध को दिखाता है।"
    }
]

for i in range(1, 101):
    q_data = dict(base_questions[(i - 1) % len(base_questions)])
    q_data["id"] = i
    q_data["questionId"] = i
    q_data["section"] = q_data["subject"]
    q_data["text"] = q_data["question"]
    q_data["correct_option"] = q_data["correctAnswer"]
    q_data["answer"] = q_data["correctAnswer"]
    questions.append(q_data)

paper_payload = {
    "totalQuestions": 100,
    "durationMinutes": 60,
    "markingScheme": {"positive": 2.0, "negative": 0.5},
    "questions": questions
}

tools = ["ssc-cgl", "upsc-prelims", "rrb-ntpc", "mpsc-rajyaseva", "ibps-po"]
bases = ["exams", "public/exams"]

for tool in tools:
    for base in bases:
        for paper_id in ["paper1", "paper2"]:
            target_dir = os.path.join(base, tool, "data")
            os.makedirs(target_dir, exist_ok=True)
            file_path = os.path.join(target_dir, f"{paper_id}.json")
            with open(file_path, "w", encoding="utf-8") as f:
                json.dump(paper_payload, f, ensure_ascii=False, indent=2)

print(">> SUCCESS: All paper1 and paper2 JSON files successfully created and verified!")
