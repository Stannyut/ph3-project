from config import db
from datetime import datetime

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    todo_task = db.Column(db.String(80), unique=False, nullable=False)
    # time = db.Column(db.Time, nullable=False)  
    date = db.Column(db.DateTime, default=datetime.utcnow, nullable=False) 
    pet_name = db.Column(db.String(80), unique=False, nullable=False)
    notes = db.Column(db.String(80), unique=False)
    reminder = db.Column(db.Boolean, default=False)

    def to_json(self):
        return {
            "id": self.id,
            "todoTask": self.todo_task,
            # "time": self.time.strftime("%H:%M:%S"), 
            "date": self.date.strftime("%Y-%m-%d"),  
            "petName": self.pet_name,
            "notes": self.notes,
            "reminder": self.reminder,
        }
