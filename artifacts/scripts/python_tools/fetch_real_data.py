import os
import json
import requests
from bs4 import BeautifulSoup
from datetime import datetime
import time

DATA_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data_output")

# Sample sources (for demonstration, using widely accessible mock endpoints or simple structures)
def fetch_latest_exams():
    print("Fetching realistic exam data...")
    # Mocking real-world exams based on structure
    exams = [
        {
            "title": "UPSC Civil Services Prelims 2026",
            "category": "upsc",
            "status": "upcoming",
            "exam_date": "2026-05-28",
            "apply_link": "https://upsconline.nic.in"
        },
        {
            "title": "SSC CGL Tier 1",
            "category": "ssc",
            "status": "active",
            "exam_date": "2026-04-15",
            "apply_link": "https://ssc.nic.in"
        },
        {
            "title": "IBPS PO Prelims",
            "category": "banking",
            "status": "upcoming",
            "exam_date": "2026-08-10",
            "apply_link": "https://ibps.in"
        }
    ]
    
    # In a real pipeline, we'd use bs4:
    # url = "https://example.com/exams"
    # response = requests.get(url)
    # soup = BeautifulSoup(response.text, 'html.parser')
    # ... parsing logic ...
    
    return exams

def fetch_latest_news():
    print("Fetching realistic news data...")
    # In a real environment we would hit a news API or scrape specific portals
    # Just demonstrating the layout
    news_items = [
        {
            "headline": "UPSC Changes Exam Pattern for 2026",
            "summary": "The Union Public Service Commission has announced vital changes to the paper pattern for the upcoming CSE 2026.",
            "source": "Education Times",
            "publish_date": datetime.now().isoformat()
        },
        {
            "headline": "SSC CGL Vacancies Increased",
            "summary": "Staff Selection Commission releases notification increasing current vacancies by 2000.",
            "source": "Employment News",
            "publish_date": datetime.now().isoformat()
        }
    ]
    return news_items

import sqlite3

def save_data_to_sqlite(exams, news, filename="ishu_data.db"):
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        
    db_path = os.path.join(DATA_DIR, filename)
    conn = sqlite3.connect(db_path)
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS exams (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            category TEXT,
            status TEXT,
            exam_date TEXT,
            apply_link TEXT
        )
    ''')
    
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS news (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            headline TEXT,
            summary TEXT,
            source TEXT,
            publish_date TEXT
        )
    ''')
    
    # Clear existing to act like a fresh seed
    cursor.execute('DELETE FROM exams')
    cursor.execute('DELETE FROM news')
    
    # Insert Exams
    for exam in exams:
        cursor.execute('''
            INSERT INTO exams (title, category, status, exam_date, apply_link)
            VALUES (?, ?, ?, ?, ?)
        ''', (exam['title'], exam['category'], exam['status'], exam['exam_date'], exam['apply_link']))
        
    # Insert News
    for item in news:
        cursor.execute('''
            INSERT INTO news (headline, summary, source, publish_date)
            VALUES (?, ?, ?, ?)
        ''', (item['headline'], item['summary'], item['source'], item['publish_date']))
        
    conn.commit()
    conn.close()
    print(f"Data successfully inserted into SQLite database at {db_path}")

def save_data(data, filename):
    if not os.path.exists(DATA_DIR):
        os.makedirs(DATA_DIR)
        
    filepath = os.path.join(DATA_DIR, filename)
    with open(filepath, 'w', encoding='utf-8') as f:
        json.dump(data, f, indent=4)
    print(f"Data successfully saved to {filepath}")


if __name__ == "__main__":
    print("Starting Python Data Ingestion Pipeline...")
    
    try:
        exams = fetch_latest_exams()
        save_data(exams, "exams_data.json")
        time.sleep(1) # respectful delay between sources
        
        news = fetch_latest_news()
        save_data(news, "news_data.json")
        
        # New integration: Insert into SQLite db directly
        save_data_to_sqlite(exams, news)
        
        print("\nPipeline execution completed successfully. Data is ready in SQLite and JSON.")
        
    except Exception as e:
        print(f"Pipeline error: {e}")
