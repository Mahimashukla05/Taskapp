export function validateTaskInput(text) {

    return text.trim().length > 0 &&
           text.trim().length <= 100;

}