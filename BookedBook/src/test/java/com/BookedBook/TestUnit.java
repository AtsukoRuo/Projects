package com.BookedBook;

import com.BookedBook.DAO.BookMapper;
import com.BookedBook.DAO.BorrowingMapper;
import com.BookedBook.POJO.BookRecord;
import com.BookedBook.POJO.BorrowingRecord;
import com.BookedBook.Util.MybatisUnit;
import com.BookedBook.Util.Pair;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import java.awt.print.Book;
import java.io.BufferedReader;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

public class TestUnit{
    @Test
    public void test()  throws Exception{
        SqlSession session = MybatisUnit.getSqlSession();
        BorrowingMapper mapper = session.getMapper(BorrowingMapper.class);
        List<BorrowingRecord> records = mapper.getBorrowingRecordByName("John");
        BookMapper book_mapper = session.getMapper(BookMapper.class);
        List<Pair<BorrowingRecord, String>> pairs = new ArrayList<>();
        if (records != null) {
            for (BorrowingRecord record:
                    records) {
                String title = book_mapper.getTitleById(record.getBook_Id());
                pairs.add(new Pair<>(record, title));
            }
        }
        ObjectMapper JSONmapper = new ObjectMapper();
        String json = JSONmapper.writeValueAsString(pairs);
        System.out.println(json);
    }

    @Test
    public void addBook() throws Exception {
        SqlSession session = MybatisUnit.getSqlSession();
        BookMapper sql_mapper = session.getMapper(BookMapper.class);
        BookRecord book = new BookRecord(0, "Test", new Timestamp(10), 10, 32.1, new Timestamp(100), 1, "Test", "test");
        book.setTime_in(new Timestamp(System.currentTimeMillis()));
        int read_num = new Random(24).nextInt(24);
        book.setImg_src(read_num + ".jpg");
        sql_mapper.addBook(book);
        String resp_json = "{\"id\":\"" + book.getId() + "\", \"img_src\": \"" + read_num + "\"jpg\"}";
        System.out.println(resp_json);
        session.commit();
        session.close();

    }
    @Test
    public void deleteBook() {
        SqlSession session = MybatisUnit.getSqlSession();
        BookMapper bookMapper = session.getMapper(BookMapper.class);
        bookMapper.deleteBookById(22);
        session.commit();
        session.close();
    }
    @Test
    public void testTime() {
        System.out.println(new Timestamp(System.currentTimeMillis()));
    }
}
