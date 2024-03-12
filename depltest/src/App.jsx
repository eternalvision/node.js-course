import { useState } from "react";
import axios from "axios";

const API_URL =
    "http://pr-manager.eba-rfpsugfm.us-west-1.elasticbeanstalk.com/api";

export const App = () => {
    const [userData, setUserData] = useState({
        data: {
            username: null,
            name: null,
            password: null,
        },
        registerResult: {
            data: null,
            error: null,
            pending: null,
        },
    });

    const { registerResult, data } = userData;

    const handleEdit = (name, value, objectName) => {
        setUserData((prevState) => ({
            ...prevState,
            [objectName]: {
                ...prevState[objectName],
                [name]: value,
            },
        }));
    };

    const Authorize = async (event) => {
        event.preventDefault();
        handleEdit("pending", true, "registerResult");

        try {
            const request = await axios.post(`${API_URL}/auth/register`, data);

            if (request) handleEdit("data", request.data, "registerResult");

            handleEdit("pending", false, "registerResult");
        } catch (error) {
            handleEdit("error", error, "registerResult");
        }
    };

    if (registerResult.pending) return <div>Loading...</div>;

    if (registerResult.data.message)
        return (
            <>
                Hello!
                <ul>
                    <li>{data.username}</li>
                    <li>{data.name}</li>
                </ul>
            </>
        );

    return (
        <form onSubmit={Authorize}>
            <input
                type="text"
                name="name"
                placeholder="Name"
                onChange={(event) => {
                    const { name, value } = event.target;
                    return handleEdit(name, value, "data");
                }}
            />
            <input
                type="text"
                name="password"
                placeholder="Password"
                onChange={(event) => {
                    const { name, value } = event.target;
                    return handleEdit(name, value, "data");
                }}
            />
            <input
                type="text"
                name="username"
                placeholder="Username"
                onChange={(event) => {
                    const { name, value } = event.target;
                    return handleEdit(name, value, "data");
                }}
            />
            <input type="submit" value="Register" />
        </form>
    );
};
