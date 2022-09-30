// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
pragma experimental ABIEncoderV2;

contract FormData {
    struct Data {
        string Name;
        string CNIC;
        string PhoneNumber;
    }

    mapping(uint256 => Data) public Object;

    uint256 counter = 0;
    bool canDownload = false;

    function setData(
        string memory _Name,
        string memory _CNIC,
        string memory _PhoneNumber
    ) public {
        Object[++counter] = Data(_Name, _CNIC, _PhoneNumber);
    }

    function getData() public view returns (Data memory) {
        return (Object[counter]);
    }

    function confirmDownload(bool _value) public {
        canDownload = _value;
    }
}

// contract SimpleCounter {

//     uint private count = 0;

//     function setCounter(uint _value) public {
//         count = _value;
//     }

//     function incrementCounter() public {
//         count += 1;
//     }
//     function decrementCounter() public {
//         count -= 1;
//     }

//     function getCount() public view returns (uint) {
//         return count;
//     }
// }
