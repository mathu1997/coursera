#include <stdio.h>
#include <math.h>
#include <malloc.h>
typedef long long int lli;
 
 
lli modMult(lli a,lli b,lli m){
	return (lli)((lli)a%m*(lli)b%m)%m;
}
 
lli power(lli a,lli k,lli m){
	lli res = 1;
	while(k--) res = modMult(res,a,m);
	return res;
}
 
 
int prime(lli n){
	if(n<=0) return 0; 
	if(n==2||n==3) return 1;
	if(n%2==0 ||(n%6!=1 && n%6!=5)) return 0;
	for(int i=3;i*i<=n;i+=2) if(n%i==0) return 0;
	return 1;
}
 
 
lli LCM(lli *arr, lli n, lli m) 
{ 
	lli res = 1; 
	lli max_num = 1,x = 2,i,j,index=0; 
	for (i=0; i<n; i++) 
		if (!prime(arr[i]) && max_num < arr[i]) 
			max_num = arr[i]; 
	while (x <= (int)sqrt(max_num))
	{ 
		index = 0 ;
		for (j=0; j<n; j++) 
			if (arr[j]%x == 0){
				arr[j] = arr[j]/x;
				index++;
			} 	 
		if (index >= 1)  res = modMult(res,x,m); 
		else {
			max_num = 1;
			for (i=0; i<n; i++){
				// printf("%d ",arr[i]);
				if (!prime(arr[i]) && max_num < arr[i]) 
					max_num = arr[i]; 
			}
			x++; }
	} 
	for (i=0; i<n; i++) 
		res = modMult(res,arr[i],m); 
	return res; 
} 
 
 
int main(){
	lli test;
	scanf("%lld",&test);
	while(test--){
		lli n,m,k,*arr,lcm,nn=0,*nop,itr=0;
		int len;
		scanf("%lld %lld %lld",&n,&m,&k);
		arr = (lli *)malloc(n*sizeof(lli));
		for(int i=0;i<n;i++){ 
			lli x,j;
			scanf("%lld\n",&x);
			for(j=0;j<nn;j++)
				if(arr[j]==x) break;
			if(j==nn) arr[nn++] = x;
		}
		lcm = LCM(arr,nn,m);
		printf("%lld\n",(lli)power(lcm,k,m));
	}
}
