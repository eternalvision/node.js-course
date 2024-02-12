// https://newsapi.org/v2/everything?q=cars&language=en&from=2024-01-29&to=2024-01-30&apiKey=cb2c7d31c1484d68a5d476f3f16a7e3e

const GetNews = async () => {
    try {
        const request = await fetch(
            "https://newsapi.org/v2/everything?q=cars&language=en&from=2024-01-29&to=2024-01-30&apiKey=cb2c7d31c1484d68a5d476f3f16a7e3e",
        );
        const data = await request.json();
        console.log(data);
    } catch (error) {
        throw new Error(error);
    }
};

GetNews();
