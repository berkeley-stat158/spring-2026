---
execute:
  eval: false
resources:
- \*\*/\*Starter.pdf
- data/\*\*/\*.csv
subtitle: Power and Pitfalls in Experiments
title: "Lab: Hormone Supplements and Disease"
toc-title: Table of contents
---

## Introduction

The goal of this exercise is to better understand the concept of
statistical power, and how easily it may be misconstrued in real world
experiments. Power is of paramount importance in a lot of applied
research, but despite its easy theoretical definition and guarantees,
there is a lot of room for bias and other errors to creep in. We shall
look at one such well-known case through the years, and read through and
analyze it ourselves before doing some simple coding with dummy
datasets.

## The Experiments

We will be looking at influential papers that attempt to analyze the
effect of post-menopausal hormone therapy in women with coronary and
cardiovascular disease risk, to better understand the effects of such
supplements. These were conducted between 1991 to 2007, though this
topic has been studied after this time period as well.

We first look at two studies: The Nurses' Health Study from 1991 and the
WHI (Women's Health Initiative) study from 2002. Read through both
papers and answer the following questions.

1.  Compare the four components of the experimental design between both
    studies. Does The Nurses Health Study qualify as an experiment? Do
    its assumptions allow for causal inference?

    -   The Nature of the Treatments.

    -   Choice of the Experimental Units.

    -   Manner of Assigning Units to Treatments

    -   The Nature of the Response

\
\
\
\
\
\
\
\
\
\

2.  Both studies analyze the same question, but arrive at very different
    conclusions. Where do you think this difference arises from?

\
\
\
\
\
\
\

3.  Which study do you trust more and why or why not? Where do you think
    the other study fails in its attempt to answer the question?

\
\
\
\
\
\
\
\

4.  Which of these studies has a larger sample size? Which would you say
    is more powerful?

\
\
\
\
\
\
\

5.  As visible above, different applied research processes, despite both
    seeming statistically valid, can often lead to entirely opposite
    conclusions with statistical significance. Does the statistical
    theory of power then fail here?

\
\
\
\
\
\
\
\

## A Third Study

\
The 2002 results from the Women's Health Initiative (WHI) dramatically
changed how doctors viewed hormone therapy. Unlike earlier observational
research such as the Nurses' Health Study, which suggested hormones
might protect the heart, the WHI trial found increased health risks.

Thus, in 2007 researchers revisited the data from the WHI study to
explore whether subgroups by age could explain the disagreement, testing
the idea that hormone therapy might have different effects depending on
when it is started. Read the study and answer the following:

6.  Compare the overall hazard ratio reported in 2002 with the hazard
    ratios reported for the 50--59, 60--69, and 70--79 age groups
    in 2007. What differences do you observe?

\
\
\
\
\
\
\
\

7.  What questions do you think the two studies try to answer? Are they
    different? How does this change their power, and the validity of
    their conclusions?

\
\
\
\
\
\
\

8.  Is the original WHI study from 2002 then wrong? Why does it generate
    a statistically significant result for all ages?

\
\
\
\
\
\
\
\

9.  In order to answer questions at a more subgroup level, do you think
    more power is required?

\
\
\
\
\
\
\

## Data Analysis

We shall now proceed to analyze some of these questions on two simulated
datasets. The datasets are stored in a `.csv` file. As earlier, use the
`readr` package, which is included inside the `tidyverse`. If you
haven't installed the tidyverse before, you can do so by running
`install.packages("tidyverse")` once.

::: cell
``` {.r .cell-code}
# load tidyverse (includes readr for CSVs)
library(tidyverse)
```
:::

::: cell
``` {.r .cell-code}
# load the data into R

data_randomized <- read_csv("https://stat158.berkeley.edu/spring-2026/data/hormone_risk/hormone_risk_randomized.csv")

data_observations <- read_csv("https://stat158.berkeley.edu/spring-2026/data/hormone_risk/hormone_risk_observational.csv")
```
:::

The dataset contains three major columns: Age Group (50-59/ 60-69/
70-79), Treatment (1/0), and Response (Continuous). The Binary Treatment
here reflects a single form and dosage level of the hormonal supplement,
evaluated against a continuous health outcome indicating cardiovascular
risk. The observational dataset contains an additional baseline health
score variable.

### @. T-tests and Power calculations

First, proceed to conduct t-tests on the whole population and at the
age-group levels using the inbuilt `t.test()` function in `R`. Do this
for both the randomized and observational datasets.

::: cell
``` {.r .cell-code}
# Conduct t-tests
```
:::

Next, investigate what the required sample size for the power of a
t-test would be here for the overall population. Use the observed effect
in the whole population for your calculations. Fill in the rest of the
`power.t.test()` function from `R` below. The data was simulated using
Gaussian distributions, so a t-test is valid in this case.

::: cell
``` {.r .cell-code}
# Calculate Effect Size from Population. Fill in the following:

# overall_mean_diff <- with(# data,
#                           mean(response[treatment==# Fill In]) -
#                             mean(response[treatment==# Fill In]))

# overall_sd <- sd(data$response)

# Check Sample size for 80% Power
power.t.test(
  delta = overall_mean_diff,
  sd = overall_sd,
  sig.level = 0.05,
  power = 0.8,
  type = "two.sample"
)
```
:::

### @. Investigating the Bias

We first subsample randomly from the randomized study to reflect a
smaller RCT. We then perform the usual t-test to see if its significant.
Feel free to change the size of the smaller sample above and below your
previous threshold and see how that changes effects.

::: cell
``` {.r .cell-code}
# Subsampling

small_study_sim <- function(n_sample = 400) {
  
  sample_data <- data_randomized[sample(1:nrow(data_randomized), n_sample), ]
  
  # result <- t.test()
  
  return(result$p.value)
}
```
:::

Now, test how often this subsample turns out to be significant with
`alpha = 0.05`

::: cell
``` {.r .cell-code}
# Run multiple small studies
n_sim <- 1000
p_values <- replicate(n_sim, small_study_sim(400))

mean(p_values < 0.05)
```
:::

We next simulate a method of sampling with bias from the observational
dataset. This is outlined below.

::: cell
``` {.r .cell-code}
# Subsampling with bias

small_biased_sim <- function(n_sample = 400) {
  
  # Only allow treated women from the top 40% healthiest
  cutoff <- quantile(data_observational$health, 0.60)
  
  eligible <- with(data_observational,
                   (treatment == "Hormone" & health > cutoff) |
                     (treatment == "Control"))
  
  pool <- data_observational[eligible, ]
  
  sample_data <- pool[sample(1:nrow(pool), n_sample), ]
  
  # result <- t.test(data = sample_data)
  
  c(
    p = result$p.value,
    effect = as.numeric(result$estimate["mean in group Hormone"] -
                          result$estimate["mean in group Control"])
  )
}
```
:::

Again conduct the t-test with these new subsample. How often are they
significant? And what is the direction?

::: cell
``` {.r .cell-code}
# Run multiple small studies

n_sim <- 1000

results_biased <- replicate(n_sim, small_biased_sim(400))

# Proportion statistically significant
mean(results_biased["p", ] < 0.05)

# Average p-value
mean(results_biased["p", ])

# Proportion with protective effect (negative estimate)
mean(results_biased["effect", ] < 0)
```
:::

### @. Power Dilution with Subgroups

Now, calculate using `power.t.test()` the required sample size for each
age-group and the observed effect size in each group. Assume independent
two-sample t-tests in each age group.

::: cell
``` {.r .cell-code}
# Power calculations

## 50-59

subgroup_data <- subset(data_randomized, age_group == "50-59")

# sub_diff <- with(subgroup_data,
#                  mean(response[treatment==?]) -
#                    mean(response[treatment==?]))

sub_sd <- sd(subgroup_data$response)

power.t.test(
  delta = sub_diff,
  sd = sub_sd,
  sig.level = 0.05,
  power = 0.8,
  type = "two.sample",
  alternative = "two.sided"
)

## Repeat for other two subgroups
```
:::

Sum these up over all three age groups. Is this larger or smaller than
the total sample size you calculated from Question 10?

::: cell
``` {.r .cell-code}
# Sum individual power calculations and compare
```
:::

How does this compare to the 2002 and 2007 WHI studies and their
results?

\
\
\
\
\
