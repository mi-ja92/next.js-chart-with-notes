const baseUrl= "http://localhost:5001"

export const getNotes= async () => {
        const response = await fetch(`${baseUrl}/notes`, {cache: 'no-store'});
        const data = await response.json();
        return data;
    }

export const addNote= async(note) => {
    const response = await fetch(`${baseUrl}/notes`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
    });
    const data = await response.json();
    return data;
}

export const deleteNote= async(id) => {
    const response = await fetch(`${baseUrl}/notes/${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    return data;
}