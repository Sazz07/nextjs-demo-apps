export const getBlogPost = async () => {
    try {
        const res = await fetch('https://api.slingacademy.com/v1/sample-data/blog-posts?limit=30');
        const data = res.json();
        return data;
    }
    catch (error) {
        console.log(error);
    }
}