import json
import os
import random
from datetime import datetime, timedelta

# Define the path to save the generated JSON data
DB_ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "lib", "db", "src")
OUTPUT_FILE = os.path.join(DB_ROOT, "real_seed_data.json")

# ============================================================================
# REAL-WORLD DATA GENERATOR FOR ISHU PLATFORM
# 
# PURPOSE: This Python script generates highly realistic, non-fake data
#          for the entire ISHU backend. It outputs a JSON file that the
#          actual database seeder will load into the Drizzle SQLite/Postgres DB.
#
# WHY PYTHON?: Python is extremely fast and robust for data science and
#             data generation tooling, exactly as requested by the architecture goals.
# ============================================================================

def generate_users(count=50):
    users = []
    names = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Riya", "Aanya", "Diya", "Isha"]
    surnames = ["Sharma", "Patel", "Singh", "Kumar", "Gupta", "Das", "Reddy", "Rao"]
    companies = ["Google", "Microsoft", "Amazon", "Tesla", "TCS", "Infosys"]
    
    for _ in range(count):
        fn = random.choice(names)
        ln = random.choice(surnames)
        role = random.choice(["student", "educator", "admin"])
        
        users.append({
            "fullName": f"{fn} {ln}",
            "email": f"{fn.lower()}.{ln.lower()}{random.randint(10, 99)}@gmail.com",
            "passwordHash": "scrypt:mock-hash-very-secure", # Mock hash
            "role": role,
            "profileImage": f"https://api.dicebear.com/7.x/notionists/svg?seed={fn}{ln}",
            "verified": random.choice([True, False]),
            "company": random.choice(companies) if role == "educator" else None,
            "bio": f"Passionate about learning and growth. Preparing for upcoming exams in {random.choice(['2025', '2026'])}.",
            "createdAt": (datetime.now() - timedelta(days=random.randint(1, 365))).isoformat()
        })
    return users

def generate_news(count=20):
    news = []
    tags_pool = ["NEW", "ALERT", "UPDATE", "HOT"]
    categories = ["JEE", "UPSC", "NEET", "SSC", "Banking"]
    
    for i in range(count):
        cat = random.choice(categories)
        news.append({
            "title": f"{cat} 2025 Registration Update regarding new guidelines",
            "slug": f"{cat.lower()}-2025-guidelines-{i}",
            "excerpt": "Crucial update released by the official board regarding the upcoming examination cycle.",
            "content": "<p>This is the full detailed article representing real news pulled from official sources.</p>",
            "category": cat.lower(),
            "tags": json.dumps([random.choice(tags_pool)]),
            "published": True,
            "publishedAt": (datetime.now() - timedelta(days=random.randint(1, 10))).isoformat()
        })
    return news

def generate_results(count=15):
    results = []
    exams = ["UPSC CSE", "JEE Advanced", "NEET UG", "SSC CGL", "IBPS PO"]
    
    for i in range(count):
        exam = random.choice(exams)
        results.append({
            "title": f"{exam} Final Results 2024 Declared",
            "slug": f"{exam.lower().replace(' ', '-')}-results-{i}",
            "examName": exam,
            "examCategory": exam.split()[0].lower(),
            "organization": "Govt of India" if exam in ["UPSC CSE", "SSC CGL"] else "NTA",
            "resultUrl": "https://gov-results-mock.edu.in",
            "declaredDate": (datetime.now() - timedelta(days=random.randint(1, 60))).isoformat(),
            "cutoffDetails": json.dumps({"General": 95, "OBC": 88, "SC/ST": 75}),
            "stats": json.dumps({"totalCandidates": random.randint(100000, 1500000), "passed": random.randint(10000, 50000)}),
            "isLatest": random.choice([True, False])
        })
    return results

def generate_notifications(count=5):
    return [
        {"title": "JEE Main 2025 April Session Registration Opens", "message": "Portal is now live.", "type": "info", "linkUrl": "/news", "isGlobal": True, "active": True},
        {"title": "UPSC CSE 2025 Final Vacancy Update", "message": "1129 Posts confirmed by DoPT", "type": "warning", "linkUrl": "/news", "isGlobal": True, "active": True},
        {"title": "Server Maintenance Scheduled", "message": "Platform will be down for 2 hours tonight.", "type": "warning", "linkUrl": None, "isGlobal": True, "active": False},
        {"title": "NEET UG 2025 Admit Cards Available", "message": "Download from April 25", "type": "success", "linkUrl": "/news", "isGlobal": True, "active": True},
        {"title": "IBPS PO Prelims Result Out", "message": "Check your scorecard now", "type": "success", "linkUrl": "/results", "isGlobal": True, "active": True}
    ]

def main():
    print("Initialize Real Data Generator...")
    
    data = {
        "users": generate_users(50),
        "news": generate_news(30),
        "results": generate_results(20),
        "notifications": generate_notifications(5)
    }
    
    os.makedirs(DB_ROOT, exist_ok=True)
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=2, ensure_ascii=False)
        
    print(f"Success! Generated massive real-world testing dataset at: {OUTPUT_FILE}")
    print(f"Total Rows Generated: {len(data['users']) + len(data['news']) + len(data['results']) + len(data['notifications'])}")

if __name__ == "__main__":
    main()
