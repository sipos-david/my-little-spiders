const deepcopy = (obj) => JSON.parse(JSON.stringify(obj));
const isValidId = (id) => id !== undefined && typeof id === 'number' && !isNaN(id);
const isValidDbObj = (obj) => typeof obj === 'object' && 'id' in obj && isValidId(obj.id);

module.exports = function () {
    const objects = [];
    let nextId = 0;

    const findById = (id) => isValidId(id) ? objects.find(obj => obj.id === id) : undefined;

    return {
        findAll: () => deepcopy(objects),
        findById: findById,
        findByIds: (ids) => {
            if (!ids || !Array.isArray(ids)) {
                return [];
            }
            return ids.reduce((acc, current) => {
                const obj = findById(current);
                if (obj) {
                    acc.push(deepcopy(obj));
                }
                return acc;
            }, []);
        },
        add: (item) => {
            const copy = deepcopy(item);
            copy.id = nextId++;
            objects.push(copy);
            return deepcopy(copy);
        },
        update: (obj) => {
            if (!isValidDbObj(obj)) {
                return undefined;
            }
            const changedIdx = objects.findIndex(o => o.id === obj.id);
            if (changedIdx < 0) {
                return undefined;
            }
            objects.splice(changedIdx, 1);
            objects.push(deepcopy(obj));
            return deepcopy(obj);
        },
        deleteById: (id) => {
            if (!isValidId(id)) {
                return undefined;
            }
            const deletedIdx = objects.findIndex(obj => obj.id === id);
            if (deletedIdx < 0) {
                return undefined;
            }
            return deepcopy(objects.splice(deletedIdx, 1));
        },
    }
}