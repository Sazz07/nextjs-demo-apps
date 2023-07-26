import { useQuery } from "@tanstack/react-query";

function GetUser() {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: () => {
            const data = localStorage.getItem("currentUser");
            return data ? JSON.parse(data) : null;
        },
    });
}

export default GetUser;
