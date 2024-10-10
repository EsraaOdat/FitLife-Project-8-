﻿using System;
using System.Collections.Generic;

namespace newProjectSUHA.Server.Models;

public partial class Enrolled
{
    public int Id { get; set; }

    public int? UserId { get; set; }

    public int? ClassSubId { get; set; }

    public int? ClassTimeId { get; set; }

    public DateTime? StartDate { get; set; }

    public DateTime? EndDate { get; set; }

    public string? PaymentMethod { get; set; }

    public virtual Subscription? ClassSub { get; set; }

    public virtual User? User { get; set; }
}