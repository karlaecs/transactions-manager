package com.transactions.backend.repository;

import com.transactions.backend.enums.TransactionType;
import com.transactions.backend.models.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByOrderByCreatedAtDesc();

    Long countTransactionByType(String type);

    Long countByType(TransactionType type);

//    Long countTransactionByTypeAnd(String T)
}
