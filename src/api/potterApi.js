
const axios = require('axios');

// Base URL for the Potter API
// const API_BASE_URL = 'https://docs.potterdb.com/apis/rest';
const API_BASE_URL = 'https://api.potterdb.com/v1';

// Function to fetch books from the API
async function fetchBooks() {
    try {
        const response = await axios.get(`${API_BASE_URL}/books`);
        return response.data.data;
    } catch (error) {
        throw new Error('Error fetching books: ' + error.message);
    }
}

// Function to fetch chapters of a specific book
async function fetchChapters(bookId) {
    try {
        const response = await axios.get(`${API_BASE_URL}/books/${bookId}/chapters`);
        return response.data.data;
    } catch (error) {
        throw new Error('Error fetching chapters: ' + error.message);
    }
}

// Main function to get the summary of the last chapter
async function getLastChapterSummary() {
    try {
        const books = await fetchBooks();

        if (books.length === 0) {
            console.log('No books found.');
            return;
        }

        console.log('List of books:');
        books.forEach((book, index) => {
            console.log(`${index + 1}. ${book.attributes.title}`);
        });

        const firstBook = books[0];
        console.log(`Selected book: ${firstBook.attributes.title}`);

        const chapters = await fetchChapters(firstBook.id);

        if (chapters.length === 0) {
            console.log('No chapters found for this book.');
            return;
        }

        const lastChapter = chapters[chapters.length - 1];
        console.log(`Summary of the last chapter (${lastChapter.attributes.title}): ${lastChapter.attributes.summary}`);
    } catch (error) {
        console.error('Error:', error.message);
    }
}

module.exports = {
    getLastChapterSummary
};


