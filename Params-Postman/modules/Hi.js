export const Hi = (res, query) => {
    const name = query.name || "Гость";

    res.end(`Hi ${name}`);
};
