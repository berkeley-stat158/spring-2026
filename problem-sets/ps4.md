---
resources:
- \*\*/\*Starter.pdf
- data/\*\*/\*.csv
- ../assets/
title: Problem Set 4
toc-title: Table of contents
---

1.  **Cancer and Group Therapy II**. Researchers randomly assigned
    metastatic breast cancer patients to either a control group or a
    group that received weekly 90-minute sessions of group therapy and
    self-hypnosis. The group therapy involved discussion and support for
    coping with the disease. The goal of the experiment was to see
    whether the latter treatment improved the patients' quality of life
    at the time, but a followup study on these patients collected data
    on the number of months of survival after the beginning of the
    study[^1].

    You can access the data from this study using the following code.

    ::: cell
    ``` {.r .cell-code}
    library(tidyverse)
    cancer <- read.csv("https://stat158.berkeley.edu/spring-2026/data/breast-cancer/breast-cancer.csv")
    ```
    :::

    `GROUP` is the original group assigned to the subject. `SURVIVAL` is
    the survival time in months from the beginning of the study. At the
    time the survival data was collected (10 years later), some subjects
    were still alive. They are flagged in the `CENSOR` column. Data (in
    this case survival time) that can only be known up to some bound is
    called *censored*.

    a.  The parameter of central interest to researchers is the $ATE$.
        What is the point estimate of this parameter using this data?
    b.  Form a 95% confidence interval associated the point estimate
        using the $t$ distribution. As before use the pooled estimate of
        the standard deviation[^2].
    c.  Form a 95% CI using RBI and the constant-effect assumption.
    d.  Methods b. and c. rely upon different assumptions. Describe what
        they are and which seem more realistic in this particular
        setting.

2.  **Confident in your confidence intervals?** In lecture we formed a
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
    stuck please consult the hints[^3][^4][^5].



More questions coming soon!

[^1]: Data from Q 4.31 in *Statistical Sleuth*.

[^2]: In R, you can do this either "by hand" using the point estimate
    plus and minus a value of `qt()` times your estimate of the SE. You
    can also return to the last time you saw this dataset, in a testing
    framework. The object created by `t.test()` has bundled with it the
    associated confidence interval.

[^3]: The idea is to recreate the random process that leads to the
    create of the random confidence interval many times and check the
    proportion of those intervals that contain the parameter. In
    randomization-based inference, the only randomness comes from the
    assignments of units to treatment and control at the start of the
    original experiment, so that's were each one of your simulations
    begins.

[^4]: For each of settings A and B above, you will want to write a
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
    proportion of `TRUE`s to estimate the coverage probability. See
    <https://andrewpbray.github.io/designrbi> for functions to
    facilitate steps 1-5.

[^5]: This code may take awhile to run - you're simulating many
    randomization-based CIs - so start with small numbers of replicates
    while you're still testing your code. You can also take advantage of
    your computers ability to run multiple R sessions at the same time
    using the `future_replicate()` function inside the `future.apply`
    package.
