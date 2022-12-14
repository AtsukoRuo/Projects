package com.BookedBook.Service;

import com.BookedBook.DAO.BookMapper;
import com.BookedBook.DAO.BorrowingMapper;
import com.BookedBook.POJO.BorrowingRecord;
import com.BookedBook.Util.MybatisUnit;
import com.BookedBook.Util.Pair;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.session.SqlSession;
import org.junit.Test;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


@WebServlet("/Search")
public class Search extends HttpServlet {

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        req.setCharacterEncoding("UTF-8");
        resp.setCharacterEncoding("UTF-8");
        resp.setContentType("text/html;charset=UTF-8");
        String name = req.getParameter("name");
        SqlSession session = MybatisUnit.getSqlSession();

        BorrowingMapper mapper = session.getMapper(BorrowingMapper.class);
        List<BorrowingRecord> records = mapper.getBorrowingRecordByName(name);
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
        resp.getWriter().write(json);
        System.out.println(json);
        session.close();
    }
}
