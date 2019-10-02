package com.transactions.backend.models;

import com.transactions.backend.enums.TransactionType;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Parameter;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;
import java.util.Date;


@Getter
@Setter
@Entity
@Table(name = "balances")
public class Balance implements Serializable {

    @Id
    @Column(name = "id")
    @GeneratedValue(generator = "balanceSequenceGenerator")
    @GenericGenerator(name = "balanceSequenceGenerator", strategy = "org.hibernate.id.enhanced.SequenceStyleGenerator", parameters = {
            @Parameter(name = "sequence_name", value = "seq_balances_id"), @Parameter(name = "initial_value", value = "1"),
            @Parameter(name = "increment_size", value = "1") })
    private Long id;

    @NotNull
    @Column(name = "total")
    private Double total;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private Date createdAt;

    @NotNull
    @Column(name = "total_credit")
    private Long totalCredit;

    @NotNull
    @Column(name = "total_debit")
    private Long totalDebit;

    @NotNull
    @Column(name = "total_transactions")
    private Long totalTransactions;

    @Transient
    private TransactionType transactionType;

    public void setTotal(Double value, TransactionType transactionType) {
        if(transactionType == TransactionType.CREDIT) {
            this.total += value;
        }
        else {
            this.total -= value;
        }
    }
}
