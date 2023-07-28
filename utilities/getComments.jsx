const { useQuery } = require("@tanstack/react-query")

const GetComments = () => {
    return useQuery({
        queryKey: ['comments'],
        queryFn: async () => {
            const res = localStorage.getItem('postComments');
            const data = JSON.parse(res);
            return data;
        }
    })
}