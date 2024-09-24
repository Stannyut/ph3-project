import React, { useState } from "react";
import axios from "axios";

const TodoForm = () => {
  const [todoTask, setTodoTask] = useState("");
  const [dateObject, setDate] = useState("");
  const [timem, setTime] = useState("");
  const [petName, setPetName] = useState("");
  const [notes, setNotes] = useState("");
  const [dailyReminder, setDailyReminder] = useState(false); 

  const [createdTodo, setCreatedTodo] = useState(null);

  // Append seconds to time string
  // const time = `${timem}:00`;

  const date = new Date(dateObject);


  const handleSubmit = async (e) => {
    e.preventDefault(); 

    const newTodo = {
      todoTask,
      date,
      petName,
      notes,
      dailyReminder,
    };

    let testme = JSON.stringify(newTodo);

    try {
      // const response = await axios.post(
      //   "http://localhost:5000/create_todo",
        
      // );

      const response = await axios.post(
        "http://localhost:5000/create_todo",
        testme,
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response)


      // setCreatedTodo(response.data);

      // setTodoTask("");
      // // setDate("");
      // // setTime("");
      // setPetName("");
      // setNotes("");
      // setDailyReminder(false);

    //   alert("Todo created successfully!");
    } catch (error) {
      console.error("Error creating todo:", error);
      // alert("Failed to create todo");
    }
  };

  //  styles
  const styles = {
    pageWrapper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh", 
      backgroundColor: "#f0f2f5",
    },
    container: {
      maxWidth: "600px",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "8px",
      backgroundColor: "#f9f9f9",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    formGroup: {
      marginBottom: "15px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      fontWeight: "bold",
    },
    input: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
    },
    textarea: {
      width: "100%",
      padding: "10px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      fontSize: "16px",
      minHeight: "80px",
    },
    checkboxLabel: {
      display: "flex",
      alignItems: "center",
    },
    checkbox: {
      marginRight: "10px",
    },
    button: {
      padding: "10px 15px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      fontSize: "16px",
      cursor: "pointer",
      marginTop: "10px",
      width: "100%",
    },
    card: {
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "15px",
      marginTop: "20px",
      backgroundColor: "#fff",
      boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
    },
    cardTitle: {
      fontSize: "20px",
      marginBottom: "10px",
      color: "#333",
    },
    cardDetail: {
      fontSize: "16px",
      marginBottom: "5px",
    },
  };

  return (
    <div style={styles.pageWrapper}>
      <div style={styles.container}>
        <h2>Create a New Todo</h2>
        <form onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Todo Task:</label>
            <input
              type="text"
              value={todoTask}
              onChange={(e) => setTodoTask(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date:</label>
            <input
              type="date"
              value={dateObject}
              onChange={(e) => setDate(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          {/* <div style={styles.formGroup}>
            <label style={styles.label}>Time:</label>
            <input
              type="time"
              value={timem}
              onChange={(e) => setTime(e.target.value)}
              required
              style={styles.input}
            />
          </div> */}
          <div style={styles.formGroup}>
            <label style={styles.label}>Pet Name:</label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Notes:</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              style={styles.textarea}
            ></textarea>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={dailyReminder}
                onChange={(e) => setDailyReminder(e.target.checked)}
                style={styles.checkbox}
              />
              Daily Reminder
            </label>
          </div>
          <button type="submit" style={styles.button}>
            Add Todo
          </button>
        </form>

        {createdTodo && (
          <div style={styles.card}>
            <h3 style={styles.cardTitle}>{createdTodo.todoTask}</h3>
            <p style={styles.cardDetail}>Date: {createdTodo.date}</p>
            <p style={styles.cardDetail}>Time: {createdTodo.time}</p>
            <p style={styles.cardDetail}>Pet Name: {createdTodo.pet_name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TodoForm;
