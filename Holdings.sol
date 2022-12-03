//SPDX-License-Identifier: Unlicense
pragma solidity 0.8.17;
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @tittle Holdings
 * @dev This contract allows to track and hold all the funds accumulated during the whole year.
 *  Every year Hidden Art will send these funds in the 5 most voted Artists from the platform.
 *  This Funds will come from a percentage of the monthly Hidden Art revenue and
 *  from the community donations. The funds will be represented as ETH
 *
 *  NOTE: This contract imports Ownable.sol
 */
contract Holdings is Ownable {
    // Modifier to check if the LockedPeriod is over.
    modifier checkLockedPeriod() {
        require(lockedPeriod < block.timestamp, "Lock in period is not over.");
        _;
    }

    uint private lockedPeriod = 365 days + block.timestamp; //Locked period for the funds (1 year)
    uint private counter; // Counter to increment +1 every year to track the funds gotten.
    // ID(Year) => total funds received that year. (1rs year the ID will be 0)
    mapping(uint => uint) holdingsYear; //Mapping to track the total found received per year.

    /**
     * @dev Emitted when the contract receives funds
     * @param amount: Total amount transferred
     * @param to: Address where the amount was transferred from
     */
    event fundsReceived(uint amount, address indexed from);
    /**
     * @dev Emitted when funds are withdrawn
     * @param amount: Total amount transferred
     * @param to: Address where the amount was transferred to
     */
    event fundsTransferred(uint amount, address indexed to);

    /**
     * @dev This function will transfer funds to the most voted Artists choosen.
     * @param _amount: Total amount to transfer.
     * @param _to: Address to transfer the amount.
     */
    function transferFunds(
        uint _amount,
        address _to
    ) public onlyOwner checkLockedPeriod {
       payable(_to).transfer(_amount);
        emit fundsTransferred(_amount, _to);
    }

    /**
     * @dev Setter for the lock in period, to lock in the funds for another year.
     */
    function setNewLockedPeriod() public onlyOwner checkLockedPeriod {
        lockedPeriod = 365 days + block.timestamp; // Set 1 more year to unlock the funds.
        counter++; //Increment counter, new year starts.
    }

    /**
     * @dev Getter for the remaining lock Period.
     */
    function remainingLockedPeriod() public view returns (uint) {
        return lockedPeriod - block.timestamp;
    }

    /**
     * @dev Payable function that allows the contract to receive funds.
     */
    receive() external payable {
        holdingsYear[counter] += msg.value;
        emit fundsReceived(msg.value, msg.sender);
    }
}
