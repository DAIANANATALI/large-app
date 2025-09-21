### Generate .env.example from .env

```bash
cat .env | sed 's/=.*/=/' > .env.example
```
