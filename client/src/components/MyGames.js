//THIS PAGE IS UNDER CONSTRUCTION - HAS NOT BEEN TOUCHED YET - MAY BE CART?
import React, { useEffect, useState } from "react";
//import { getRoutines, createNewRoutine } from "./api/api";

const MyGames = () => {
  //const [routines, setRoutines] = useState([]);
  const [game, setName] = useState("");
  const [goal, setGoal] = useState("");

  const [editRoutine, setEditRoutine] = useState({});

  const loadRoutines = async () => {
    const routines = await getRoutines();
    setRoutines(routines);
  };

  useEffect(() => {
    loadRoutines();
  }, []);

  const renderRoutines = () => {
    return (
      <div
        style={{
          marginTop: 20,
        }}
      >
        {routines.map((routine) => {
          const { name, id, creatorName, goal, activities } = routine;

          return (
            <div key={id} style={{ paddingBottom: 20 }}>
              <div>Name: {name}</div>
              <div>Goal: {goal}</div>
              <div> Creator name: {creatorName}</div>
              <div>
                <div>Activities for this routine:</div>
                {activities.map((activity) => {
                  const { id, description, duration, count, name } = activity;
                  return (
                    <div key={id} style={{ paddingTop: 20 }}>
                      <div>Activity name: {name}</div>
                      <div>Activity description: {description}</div>
                      <div>Activity count: {count}</div>
                      <div>Activity duration: {duration}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const createRoutine = async () => {
    try {
      await createNewRoutine(name, goal);
      loadRoutines();
    } catch (err) {
      console.error("error creating: ", err);
    }
  };

  const renderForm = () => {
    return (
      <div>
        <div>Create a new Routine:</div>
        <div>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          Goal:
          <input
            type="text"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
          />
        </div>
        <button onClick={() => createRoutine()}>Create</button>
      </div>
    );
  };
  // const result = async () => {
  //     await renderRoutines.filter(creatorName => !creatorName);
  // }
  return (
    <div>
      {renderForm()}
      {renderRoutines()}
    </div>
  );
};
export default MyRoutines;
