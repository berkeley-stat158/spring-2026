---
execute:
  eval: false
resources:
- \*\*/\*Starter.pdf
- data/\*\*/\*.csv
title: Problem Set 3
toc-title: Table of contents
---

1.  **The Secret to Longevity**. Scientists are interested in whether
    the energy costs involved in reproduction affect longevity[^1]. In
    this experiment, 125 male fruit flies were divided at random into
    five sets of 25. In group 1, the males were kept by themselves. In
    groups 3 and 5, the males were supplied with one or eight receptive
    virgin female fruit flies per day, respectively. In groups 2 and 4,
    the males were supplied with one or eight unreceptive (pregnant)
    female fruit flies per day, respectively. Other than the number and
    type of companions, the males were treated identically. The
    longevity of the flies was observed.

    You can access the data as a csv file at:
    <https://stat158.berkeley.edu/spring-2026/data/fruit-flies/fruit-flies.csv>

    a.  Visualize the data and interpret what you see. Be sure to
        comment both on the center of the distributions and their
        spread.

    b.  *ANOVA "by hand"*. Without using any of the built-in commands
        (`aov()`, `anova()`) create a one-way ANOVA table minus the
        p-values. You're welcome to use either a base R or `dplyr`
        approach. It is a bit tedious, however it's useful to cobble
        together each of the statistics in an ANOVA table just once in
        your lives. You can check your answers with the output of
        `aov()` shown below.

    :::: cell
    ::: {.cell-output .cell-output-stdout}
                     Df Sum Sq Mean Sq F value Pr(>F)
        factor(trt)   4  11939  2984.8   13.61       
        Residuals   120  26314   219.3               
    :::
    ::::

    c.  State your conclusion about the scientific question using
        Model-based inference. Be clear about the data generation model
        your approach relies upon and the null hypothesis that you're
        evaluating. To calculate the p-value, use the `pf()` function
        and then verify it using the `aov()` function[^2].

    d.  State your conclusion about the scientific question using
        Randomization-based Inference. Be clear about the data
        generation model your approach relies upon and the null
        hypothesis that you're evaluating. For your test statistic, use
        the F-statistic that you built the code for from part a above.

    e.  How do the results of the model-based and randomization-based
        inference compare? Do they lead to the same conclusion? Do they
        rely on the same assumptions? Which do you think is more
        appropriate for this problem?

<!-- -->

2.  **More Comparisons for Longevity**. In the experiment regarding the
    fruit flies, the ANOVA analysis only tests whether there were any
    differences between the group means. Suppose there was further
    interest in whether the 1 pregnant group was different from the 1
    virgin group (for questions a and b, restrict the data set to these
    two groups).

    a.  Perform a randomization test to compare these two groups using
        the t-statistic. Assume the two groups have the same variance
        (revisit your notes on the t-test and the pooled estimate of the
        SE).

    b.  Repeat the randomization test but this time use an F-statistic.
        How do the results of this analysis this compare to the results
        in part (a)?

    c.  Calculate an ANOVA table for this comparison and report the
        value of $\sqrt{MS_{residuals}}$, which is an estimate of
        $\sigma$. How does that compare to the estimate of the standard
        deviation that you used for the t-statistic ($s_{p}$)?

    You are welcome to use built-in R commands for this question, if
    appropriate.



More questions to come next week!

[^1]: Question from Problem 3.2 in Oehlert textbook, original data from
    Hanley and Shapiro (1994), \`\`Sexual activity and the lifespan of
    male fruitflies: a dataset that gets attention," *Journal of
    Statistics Education 2*.

[^2]: Recall all named probability distributions have a CDF in R with
    the prefix `p`. The F-distribution is no exception, so you can use
    `pf()` to calculate the p-value for your ANOVA table. The arguments
    to `pf()` are the F-statistic, the degrees of freedom for the
    numerator, and the degrees of freedom for the denominator. Recall a
    test using the F statistic is a right-tailed test. The standard
    anova output is available with `summary(aov(y ~ x, data))` (be sure
    your `x` is a factor vector).
