import { useQuery } from "@tanstack/react-query";

const GetUser = () => {
    return useQuery({
        queryKey: ["currentUser"],
        queryFn: () => {
            const data = localStorage.getItem("currentUser");
            return data && JSON.parse(data);
        },
    });
}

export default GetUser;
