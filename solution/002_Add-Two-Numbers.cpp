// Add Two Numbers(递归法-Java版本)
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) { val = x; }
 * }
 */
public class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        ListNode dummy = new ListNode(0);
        return addTwoNumbers(l1, l2, 0, dummy, dummy);
    }

    private ListNode addTwoNumbers(ListNode l1, ListNode l2, int carry, ListNode current, ListNode result) {
        if (l1 == null && l2 == null) {
            if (carry != 0) current.next = new ListNode(carry);
            return result.next;
        } else {
            l1 = (l1 == null) ? new ListNode(0) : l1;
            l2 = (l2 == null) ? new ListNode(0) : l2;
        }
        int sum = l1.val + l2.val + carry;
        carry = sum / 10;
        current.next = new ListNode(sum % 10);

        return addTwoNumbers(l1.next, l2.next, carry, current.next, result);
    }
}
