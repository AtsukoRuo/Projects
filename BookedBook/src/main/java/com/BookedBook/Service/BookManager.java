package com.BookedBook.Service;

import com.BookedBook.DAO.BookMapper;
import com.BookedBook.DAO.BorrowingMapper;
import com.BookedBook.POJO.BookRecord;
import com.BookedBook.POJO.BorrowingRecord;
import com.BookedBook.Util.MybatisUnit;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.session.SqlSession;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.awt.print.Book;
import java.io.BufferedReader;
import java.io.IOException;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Random;

@WebServlet("/BookManager")
public class BookManager extends HttpServlet {
    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
            req.setCharacterEncoding("UTF-8");
            resp.setCharacterEncoding("UTF-8");
            resp.setContentType("text/html;charset=UTF-8");
            SqlSession session = MybatisUnit.getSqlSession();
            BookMapper bookMapper = session.getMapper(BookMapper.class);
            BorrowingMapper borrowingMapper = session.getMapper(BorrowingMapper.class);
            ObjectMapper JSONmapper = new ObjectMapper();
            JSONmapper.setDateFormat(new SimpleDateFormat("yyyy-MM-dd"));
            String json;
            int id;
            switch (req.getParameter("operation")) {
                case "getAllBooks":
                    List<BookRecord> records = bookMapper.getAllBooks();
                    json = JSONmapper.writeValueAsString(records);
                    resp.getWriter().write(json);
                    break;
                case "getBorrowingRecordOfBook":
                    id = Integer.parseInt(req.getParameter("id"));
                    List<BorrowingRecord> borrowingRecordList = borrowingMapper.getBorrowingRecordByBookId(id);
                    json = JSONmapper.writeValueAsString(borrowingRecordList);
                    resp.getWriter().write(json);
                    break;
                case "getBook":
                    id = Integer.parseInt(req.getParameter("id"));
                    BookRecord record = bookMapper.getBookRecordById(id);
                    json = JSONmapper.writeValueAsString(record);
                    resp.getWriter().write(json);
                    break;
                default:
                    break;
            }
    }

    @Override
    protected void doDelete(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {

        SqlSession session = MybatisUnit.getSqlSession();
        BookMapper bookMapper = session.getMapper(BookMapper.class);
        bookMapper.deleteBookById(Integer.parseInt(req.getParameter("id")));
        session.commit();
        session.close();
    }

    @Override
    protected void doPost(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");

        SqlSession session = MybatisUnit.getSqlSession();
        BookMapper bookMapper = session.getMapper(BookMapper.class);
        BorrowingMapper borrowingMapper = session.getMapper(BorrowingMapper.class);

        BufferedReader reader = req.getReader();
        String json = "", temp = null;
        while ((temp = reader.readLine()) != null)
            json += temp;
        json = json.toLowerCase();
        System.out.println(json);
        ObjectMapper mapper = new ObjectMapper();
        Map<String, String> map;
        BorrowingRecord borrowingRecord;
        BookRecord bookRecord;
        switch (req.getParameter("operation")) {
            case "add" :

                bookRecord = null;
                try {
                    bookRecord = mapper.readValue(json, BookRecord.class);
                } catch(Exception e) {
                    e.printStackTrace();
                }

                bookRecord.setTime_in(new Timestamp(System.currentTimeMillis()));
                int read_num = new Random(System.currentTimeMillis()).nextInt(23) + 1;
                bookRecord.setImg_src(read_num + ".jpg");
                bookRecord.setId(0);
                bookMapper.addBook(bookRecord);
                String resp_json = "{\"id\":\"" + bookRecord.getId() + "\", \"img_src\": \"" + read_num + ".jpg\"}";
                resp.getWriter().write(resp_json);
                break;
            case "update" :
                map = mapper.readValue(json, Map.class);
                bookRecord = bookMapper.getBookRecordById(Integer.parseInt(map.get("book_id")));
                for (Map.Entry<String, String> entry : map.entrySet()) {
                    String key = entry.getKey();
                    String value = entry.getValue();
                    if (value.length() == 0) continue;
                    bookRecord.setValueByName(key, value);
                }
                bookMapper.updateBookRecord(bookRecord);
                break;
            case "return" :
                map = mapper.readValue(json, Map.class);
                borrowingRecord = new BorrowingRecord();
                borrowingRecord.setStatus_back(Integer.parseInt(map.get("status")));
                borrowingRecord.setTime_back(new Timestamp(System.currentTimeMillis()));
                borrowingRecord.setStudent_id(map.get("student_id"));
                borrowingRecord.setInfo(map.get("note"));
                borrowingRecord.setBook_Id(Integer.parseInt(map.get("book_id")));
                borrowingMapper.updateBorrowingRecord( borrowingRecord);
                break;
            case "borrow" :
                map = mapper.readValue(json, Map.class);
                borrowingRecord = new BorrowingRecord(
                    0, Integer.parseInt(map.get("book_id")),
                        map.get("name"), map.get("student_id"), map.get("contact"),
                        new Timestamp(System.currentTimeMillis()),
                        null, 0, ""
                );
                borrowingMapper.insertBorrowingRecord(borrowingRecord);
                break;

            default :
                break;
        }
        session.commit();
        session.close();
    }

}
