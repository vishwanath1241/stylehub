#include<stdio.h>

int main()
{
    int n,i,j;
    int p[20],at[20],bt[20],ct[20],tat[20],wt[20];
    int temp;
    float avgWT=0,avgTAT=0;

    printf("Enter number of processes: ");
    scanf("%d",&n);

    if(n<=0 || n>20)
    {
        printf("Invalid number of processes.");
        return 0;
    }

    for(i=0;i<n;i++)
    {
        p[i]=i+1;

        printf("\nProcess %d\n",p[i]);

        printf("Arrival Time: ");
        scanf("%d",&at[i]);

        printf("Burst Time: ");
        scanf("%d",&bt[i]);
    }

    for(i=0;i<n-1;i++)
    {
        for(j=i+1;j<n;j++)
        {
            if(bt[i]>bt[j])
            {
                temp=bt[i];
                bt[i]=bt[j];
                bt[j]=temp;

                temp=at[i];
                at[i]=at[j];
                at[j]=temp;

                temp=p[i];
                p[i]=p[j];
                p[j]=temp;
            }
        }
    }

    ct[0]=at[0]+bt[0];

    for(i=1;i<n;i++)
    {
        if(ct[i-1]<at[i])
            ct[i]=at[i]+bt[i];
        else
            ct[i]=ct[i-1]+bt[i];
    }

    for(i=0;i<n;i++)
    {
        tat[i]=ct[i]-at[i];
        wt[i]=tat[i]-bt[i];
    }

    printf("\n------------------------------------------------");
    printf("\nP\tAT\tBT\tCT\tTAT\tWT");
    printf("\n------------------------------------------------");

    for(i=0;i<n;i++)
    {
        printf("\nP%d\t%d\t%d\t%d\t%d\t%d",
               p[i],at[i],bt[i],ct[i],tat[i],wt[i]);

        avgWT += wt[i];
        avgTAT += tat[i];
    }

    printf("\n------------------------------------------------");
    printf("\nAverage Turnaround Time = %.2f",avgTAT/n);
    printf("\nAverage Waiting Time = %.2f",avgWT/n);

    return 0;
}
