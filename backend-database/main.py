from flask import request, jsonify 
from config import app, db
from modals import Todo
from datetime import datetime


@app.route("/todo", methods=["GET"])
def get_todo():
    todos = Todo.query.all()
    json_todos = list(map(lambda x: x.to_json(), todos))
    return jsonify({"todos": json_todos})

@app.route("/create_todo", methods=["POST"])
def create_todo():
    data = request.get_json()
    print(data)

    todo_task = request.json.get("todoTask")
    # time = request.json.get("time")
    date = request.json.get("date")
    date2 = date.rstrip('Z')
    dateobject = datetime.fromisoformat(date2)
    pet_name = request.json.get("petName")
    notes = request.json.get("notes")
    reminder = request.json.get("reminder", False) 
    

    if not all([todo_task, pet_name]):
        return jsonify({"message": "You must fill every field"}), 400

    new_todo = Todo(todo_task=todo_task, date=dateobject, pet_name=pet_name, notes=notes, reminder=reminder)
    
    try:
        db.session.add(new_todo)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": "Todo created"}), 201

@app.route("/update_todo/<int:todo_id>", methods=["PATCH"])
def update_todo(todo_id):
    todo = Todo.query.get(todo_id)

    if not todo:
        return jsonify({"message": "Todo not found"}), 404
    
    data = request.json
    
    todo.todo_task = data.get("todoTask", todo.todo_task)
    todo.time = data.get("time", todo.time)
    todo.date = data.get("date", todo.date) 
    todo.pet_name = data.get("petName", todo.pet_name)
    todo.notes = data.get("notes", todo.notes) 
    reminder = request.json.get("reminder", False)

    db.session.commit()

    return jsonify({"message": "Todo updated"}), 200

@app.route("/delete_todo/<int:todo_id>", methods=["DELETE"])
def delete_todo(todo_id):
    todo = Todo.query.get(todo_id)

    if not todo:
        return jsonify({"message": "Todo not found"}), 404
    
    db.session.delete(todo)
    db.session.commit()

    return jsonify({"message": "Todo deleted"}), 200


if __name__ == "__main__":  
    with app.app_context():
        db.create_all()  
    app.run(debug=True)
