import { useEffect, useState } from "react";
import "./App.css";
import { Navbar } from "./components/Navbar";
import axios from "axios";
import { IoSearch } from "react-icons/io5";

function App() {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://192.168.1.10:8080/")
            .then((response) => {
                setUsers(response.data);
                setFilteredUsers(response.data);
                setIsLoading(false);
            })
            .catch(() => {
                setIsLoading(false);
            });
    }, []);

    const handleSearchChange = (e) => {
        if (e.target.value !== "") {
            const results = filteredUsers.filter((user) => {
                return user.email
                    .toLowerCase()
                    .includes(e.target.value.toLowerCase());
            });

            setFilteredUsers(results);
        } else {
            setFilteredUsers(users);
        }
    };

    console.log(users);
    return (
        <>
            <Navbar />

            <div className="table__container">
                <div className="input__container">
                    <IoSearch style={{ fontSize: "20px" }} />
                    <input className="input" onChange={handleSearchChange} />
                </div>

                <table className="users__table">
                    <thead>
                        <tr className="table__row">
                            <th>IMAGE</th>
                            <th>EMAIL</th>
                            <th>PASSWORD</th>
                        </tr>
                    </thead>

                    <tbody className="table__body">
                        {filteredUsers.map((user, index) => {
                            return (
                                <tr className="table__row" key={index}>
                                    <td>
                                        <img
                                            loading="lazy"
                                            src={
                                                user.image
                                                    ? `http://192.168.1.10:8080/images/${user.image}`
                                                    : "https://www.w3schools.com/w3images/avatar2.png"
                                            }
                                            alt=""
                                        />
                                    </td>

                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
