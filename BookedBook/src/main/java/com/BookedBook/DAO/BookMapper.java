package com.BookedBook.DAO;

import com.BookedBook.POJO.BookRecord;

import java.util.List;

public interface BookMapper {
    String getTitleById(int id);
    List<BookRecord> getAllBooks();
    BookRecord getBookRecordById(int id);

    int updateBookRecord(BookRecord record);
    int addBook(BookRecord book);
    int deleteBookById(int id);
}
