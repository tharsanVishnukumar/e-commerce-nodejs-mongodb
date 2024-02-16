type TLog = {
    message: string,
    type: 'info' | 'error',
}

export const log = (data: TLog) => {

    const date = new Date();
    const dateString = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
    const message = `[${dateString}] [${data.type.toUpperCase()}] ${data.message}`;
    // console.log(`[${dateString}] [${data.type.toUpperCase()}] ${data.message}`);

    console.log(message);
};
