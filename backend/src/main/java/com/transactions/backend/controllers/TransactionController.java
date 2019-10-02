package com.transactions.backend.controllers;

import com.transactions.backend.enums.TransactionType;
import com.transactions.backend.models.Balance;
import com.transactions.backend.models.Transaction;
import com.transactions.backend.repository.BalanceRepository;
import com.transactions.backend.repository.TransactionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/transactions")
public class TransactionController {
    @Autowired
    TransactionRepository transactionRepository;

    @Autowired
    BalanceRepository balanceRepository;

    @GetMapping
    public ResponseEntity<?> index() {
        return ResponseEntity.ok().body(this.transactionRepository.findAllByOrderByCreatedAtDesc());
    }

    @PostMapping
    public ResponseEntity<?> save(@Valid @RequestBody Transaction transaction) {
        Balance balance = this.balanceRepository.findFirstByOrderByIdDesc();
        Double value = transaction.getValue();
        Long countCredit = transactionRepository.countByType(TransactionType.CREDIT);
        Long countDebit = transactionRepository.countByType(TransactionType.DEBIT);
        Long countTransactions = transactionRepository.count();
        

        if(transaction.getType() == TransactionType.CREDIT) {
            balance.setTotal(value, TransactionType.CREDIT);
            countCredit++;
        } else {
            balance.setTotal(value, TransactionType.DEBIT);
            countDebit++;
        }

        countTransactions++;
        balance.setTotalCredit(countCredit);
        balance.setTotalDebit(countDebit);
        balance.setTotalTransactions(countTransactions);
        this.balanceRepository.save(balance);
        return new ResponseEntity<>(this.transactionRepository.save(transaction), HttpStatus.CREATED);
    }

}
