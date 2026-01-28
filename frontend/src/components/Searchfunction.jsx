import { useMemo } from "react";


// Example how to use: src/pages/Top2000Overview.jsx
// Usage:
//   const filteredData = useSearch(
//        data,                     // array to search in
//        searchValue,              // string from input field
//        item => item.artist.name  // function returning searchable text
//    );


function normalizeText(text) {
    return text
        .toLowerCase()
        .normalize("NFD")               // split letters + accents
        .replace(/[\u0300-\u036f]/g, ""); // remove accents
}


function matchesValue(value, searchValue) {
    const normalizedValue = normalizeText(value);
    const words = normalizeText(searchValue).split(" ");

    return words.every(word =>
        normalizedValue.includes(word)
    );
}


export default function useSearch(data, searchValue, getValue) {
    return useMemo(() => {
        if (!searchValue) return data;

        return data.filter(item => {
            const value = getValue(item);
            if (!value) return false;

            return matchesValue(value, searchValue);
        });
    }, [data, searchValue, getValue]);
}


