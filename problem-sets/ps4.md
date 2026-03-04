---
execute:
  eval: false
resources:
- \*\*/\*Starter.pdf
- data/\*\*/\*.csv
title: Problem Set 4
toc-title: Table of contents
---

1.  **Confident in your confidence intervals?** In lecture we formed a
    randomization-based confidence interval for the difference in mean
    response between the $X=11$ group and the $X=73$ group in the
    anchoring experiment. Your goal for this exercise is to use
    simulation to check the coverage of your interval and evaluate the
    consequences of using the constant effect assumption when it is
    violated.

    This simulation requires knowing the value of the true parameter,
    $ATE$, so you'll be playing this question as an all knowing god with
    all potential outcomes at your fingertips. You can find two full
    schedules of potential outcomes at the following links.

    ``` r
    godlikeA <- read.csv("https://stat158.berkeley.edu/spring-2026/data/anchoring/godlike_schedule_A.csv")
    godlikeB <- read.csv("https://stat158.berkeley.edu/spring-2026/data/anchoring/godlike_schedule_B.csv")
    ```

    Schedule A represents a world with constant effects: the individual
    treatment effect for each unit is the same. Schedule B represents a
    world with variable effects: each unit has a different individual
    treatment effect.

    a.  For each god-like schedule A and B, calculate the true $ATE$
        parameters.
    b.  For god-like schedule A, use simulation to create many original
        experiments and then for each construct a randomization-based CI
        with a constant effect assumption and evaluate whether it
        contains the true paramters. Select a $1-\alpha$ confidence
        level to use that is between 60% and 90%. For A and B
        separately, report the proportion of confidence intervals that
        contain the parameter.
    c.  Repeat b. but use god-like schedule B.
    d.  Did your randomization-based CIs with the constant effect
        assumption from the previous two questions succeed in capturing
        the parameter with probability $1-\alpha$? If not, provide some
        intuition for why not.

    This is a challenging simulation to set up correctly. If you get
    stuck please consult the hints[^1][^2][^3].



More questions coming soon!

[^1]: The idea is to recreate the random process that leads to the
    create of the random confidence interval many times and check the
    proportion of those intervals that contain the parameter. In
    randomization-based inference, the only randomness comes from the
    assignments of units to treatment and control at the start of the
    original experiment, so that's were each one of your simulations
    begins.

[^2]: For each of settings A and B above, you will want to write a
    function. One approach is to write a function that:

    1.  Randomly assigns each unit to one of the two groups.
    2.  Sets the potential outcome that is *not* observed to be `NA`. At
        this stage, you have the analog of an original experimental data
        set.
    3.  Calculates $\widehat{ATE}$.
    4.  Uses $\widehat{ATE}$ to impute the missing potential outcomes.
    5.  Using this filled-in schedule, form a randomization-based
        confidence interval.
    6.  Check whether the interval contains the true parameter and
        return that logical value.

    Then you can replicate this function many times and count the
    proportion of `TRUE`s to estimate the coverage probability. Note
    that if you use the code from the slides, you will be pivoting the
    data back and forth between schedule-format (with a column for each
    potential outcome) and dataframe-format (with all of the observed
    outcomes in a single column).

[^3]: This code may take awhile to run - you're simulating many
    randomization-based CIs - so start with small numbers of replicates
    while you're still testing your code. You can also take advantage of
    your computers ability to run multiple R sessions at the same time
    using the `future_replicate()` function inside the `future.apply`
    package.
