const isNumber = (a: unknown): a is number => {
    return !!Number(a);
};

export default isNumber;