#include <stdio.h>
#include <math.h>
#include <malloc.h>
typedef long long int lli;

lli GCD(lli a,lli b){
	if(b==0) return a;
	return GCD(b, a % b); 
}

lli LCM(lli *arr,lli n)
{
	lli ans = abs(arr[0]);
	for(int i=1;i<n;i++)
		ans = (abs(arr[i])*ans)/(GCD(ans,abs(arr[i])));
	return ans;
}

int main(){
	lli test;
	scanf("%lld",&test);
	while(test--){
		lli n,m,k,*arr,lcm;
		int len;
		scanf("%lld %lld %lld",&n,&m,&k);
		arr = (lli *)malloc(n*sizeof(lli));
		for(int i=0;i<n;i++) scanf("%lld\n",&arr[i]);
		lcm = LCM(arr,n);
		printf("%lld\n",(lli)pow(lcm%m,k)%m);
		// printf("%lld",power(lcm,k,m));
	}
}
