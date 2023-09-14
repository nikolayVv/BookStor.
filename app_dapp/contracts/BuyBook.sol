// SPDX-License-Identifier: MIT
pragma solidity ^0.8.10;

abstract contract Transaction {
    function buyingStart(address payable _addressSeller, uint256 _value, uint8 _ether) virtual payable public;
    function buyingEnd(string memory _title, uint256 _value) virtual public;
}

contract BuyBook is Transaction {

    struct Book {
        string title;
        uint256 paidFor;
    }

    enum StatusTransaction {
        BuyingStart,
        BuyingEnd
    }

    address public buyer;
    StatusTransaction public statusTransaction;

    mapping(address => uint256) public state;
    Book[] public books;

    modifier onlyBuyer() {
        require(msg.sender == buyer, "The caller must be the buyer");
        _;
    }

    modifier onlyWhenBuying() {
        require(statusTransaction == StatusTransaction.BuyingStart, "The function can be called only while buying!");
        _;
    }

    modifier onlyAfterBuying() {
        require(statusTransaction == StatusTransaction.BuyingEnd, "The function can be called only after buying!");
        _;
    }

    event BuyingStartEvent(address payable _addressSeller, uint256 _value, uint8 _ether);
    event BuyingEndEvent(string _title, uint256 _value);
    event ChangeStatusTransactionEvent(StatusTransaction prevStatus, StatusTransaction newStatus);

    constructor(uint256 _state) {
        buyer = msg.sender;
        state[buyer] = _state;
        statusTransaction = StatusTransaction.BuyingStart;
    }

    function buyingStart(address payable _addressSeller, uint256 _value, uint8 _ether) virtual override payable public onlyBuyer onlyWhenBuying {
        require(state[buyer] >= _ether, "Not enough balance");
        require(msg.value >= _value, "Not full ether");
        //require(state[_addressSeller] + _value >= state[_addressSeller]);
        bool transaction = payable(_addressSeller).send(_value);
        require(transaction, "Error when sending Ether");
        statusTransaction = StatusTransaction.BuyingEnd;
        state[buyer] -= _ether;
        state[_addressSeller] += _ether;
        emit BuyingStartEvent(_addressSeller, _value, _ether);
        emit ChangeStatusTransactionEvent(StatusTransaction.BuyingStart, statusTransaction);
    }

    function buyingEnd(string memory _title, uint256 _value) virtual override public onlyBuyer onlyAfterBuying {
        statusTransaction = StatusTransaction.BuyingStart;
        bool found = false;
        for (uint256 i = 0; i < books.length; i++) {
            if (keccak256(bytes(books[i].title)) == keccak256(bytes(_title))) {
                books[i].paidFor += _value;
                found = true;
                break;
            }
        }
        if (!found) {
            books.push(
                Book({
            title: _title,
            paidFor: _value
            })
            );
        }
        emit BuyingEndEvent(_title, _value);
        emit ChangeStatusTransactionEvent(StatusTransaction.BuyingEnd, statusTransaction);
    }

    function getBooks() public view returns(Book[] memory) {
        return books;
    }

    function getStatusTransaction() public view returns(StatusTransaction) {
        return statusTransaction;
    }
}