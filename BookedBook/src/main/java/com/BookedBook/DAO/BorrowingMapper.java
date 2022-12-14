package com.BookedBook.DAO;

import com.BookedBook.POJO.BorrowingRecord;
import java.util.List;

public interface BorrowingMapper {
    List<BorrowingRecord> getBorrowingRecordByName(String name);
    List<BorrowingRecord> getBorrowingRecordByBookId(int id);
    int updateBorrowingRecord(BorrowingRecord record);
    int insertBorrowingRecord(BorrowingRecord record);
}
