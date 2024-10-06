<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use Carbon\Carbon;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LeaveController extends Controller
{
    // Show leave request page
    public function leaveRequestPage(Request $request)
    {
        return Inertia::render("LeaveRequest", [
            'leaveBalance' => DB::select("CALL CalculateLeaveBalance(?)", [$request->user()->id])[0]->RemainingLeaveDays,
        ]);
    }

    // Get all leave requests
    public function getLeaveRequests(Request $request)
    {
        $leaves = LeaveRequest::where('user_id', $request->user()->id)->orderBy("id", "desc")->get();
        return response()->json($leaves);
    }

    // Handle create leave request
    public function leaveRequest(Request $request)
    {
        $currentDate = Carbon::now();
        $balance = DB::select("CALL CalculateLeaveBalance(?)", [$request->user()->id])[0]->RemainingLeaveDays;
        $request->validate([
            'startDate' => 'required|date|after_or_equal:' . $currentDate,
            'reason' => 'required|string',
            'totalDays' => 'required|numeric|lte:' . $balance,
        ]);

        $startDate = Carbon::parse($request->startDate); // Parsing startDate menjadi objek Carbon
        $totalDays = $request->totalDays;
        $endDate = $startDate->copy()->addDays(intval($totalDays));

        $reason = $request->reason;
        $userId = $request->user()->id;

        $leaveRequest = new LeaveRequest();
        $leaveRequest->start_date = $startDate;
        $leaveRequest->end_date = $endDate;
        $leaveRequest->reason = $reason;
        $leaveRequest->total_days = $totalDays;
        $leaveRequest->user_id = $userId;

        $leaveRequest->save();

        return redirect()->route('home');
    }

    // Show pending leave request page
    public function pendingLeavePage(Request $request)
    {
        $leaves = LeaveRequest::where('status', 'Pending')->orderBy("id", "desc")->get();
        return Inertia::render("PendingLeave", [
            'pendingLeaveReqs' => $leaves,
        ]);
    }

    // Handle update leave request
    public function updateLeave(Request $request)
    {
        $userId = $request->user()->id;
        $request->validate([
            'status' => 'required|string|in:Approved,Rejected',
            'id' => 'required|numeric|exists:leave_requests,id',
        ]);

        $leave = LeaveRequest::find($request->id);
        if ($leave->user->id == $userId) {
            return redirect()->back()->withErrors(['error' => 'You cannot approve or reject your own leave request.']);
        }
        $leave->status = $request->status;
        $leave->note = $request->note;
        $leave->save();

        return redirect()->route('pending-leave');
    }
}
