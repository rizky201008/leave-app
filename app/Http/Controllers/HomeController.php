<?php

namespace App\Http\Controllers;

use App\Models\LeaveRequest;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{

    // Show home page
    public function homePage(Request $request)
    {
        $totalPendingLeaveReqs = 0;
        if ($request->user()->dept == 'hrd & GA') {
            $totalPendingLeaveReqs = LeaveRequest::where('status', 'Pending')->count();
        }

        return Inertia::render("Home", [
            'leaveBalance' => DB::select("CALL CalculateLeaveBalance(?)", [$request->user()->id])[0]->RemainingLeaveDays,
            'monthWorked' => DB::select("CALL CalculateMonthWorked(?)", [$request->user()->id])[0]->MonthWorked,
            'leaveUsed' => DB::select("CALL CalculateLeaveUsed(?)", [$request->user()->id])[0]->LeaveUsed,
            'pendingLeaveReqs' => $totalPendingLeaveReqs,
        ],);
    }
}
