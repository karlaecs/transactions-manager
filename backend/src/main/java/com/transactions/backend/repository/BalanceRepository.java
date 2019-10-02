package com.transactions.backend.repository;

import com.transactions.backend.models.Balance;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BalanceRepository extends JpaRepository<Balance, Long> {

    Balance findFirstByOrderByIdDesc();
}
