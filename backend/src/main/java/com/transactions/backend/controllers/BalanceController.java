package com.transactions.backend.controllers;

import com.transactions.backend.models.Balance;
import com.transactions.backend.repository.BalanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/balances")
public class BalanceController {
    @Autowired
    BalanceRepository balanceRepository;

    @GetMapping
    public ResponseEntity<?> index() {
        return ResponseEntity.ok().body(this.balanceRepository.findFirstByOrderByIdDesc());
    }

//    @PostMapping
//    public ResponseEntity<?> save(@RequestBody Balance balance) {
//        return new ResponseEntity<>(this.balanceRepository.save(balance), HttpStatus.CREATED);
//    }
}
