// обрезка строки
export const cutString = (string, maxLength, postfix = '...') =>
    (typeof string === 'string') ?
        (string.length > maxLength) ?
            string.substr(0, maxLength) + postfix :
            string :
        '';