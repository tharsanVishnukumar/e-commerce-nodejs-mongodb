type TLog = {
    message: string,
    type: 'info' | 'error',
}

export const log = (data: TLog) => {
    console.log(data);
};
